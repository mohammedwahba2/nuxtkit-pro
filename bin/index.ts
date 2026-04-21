#!/usr/bin/env node

import prompts from 'prompts'
import fs from 'fs-extra'
import path from 'path'
import { green, cyan, yellow, red } from 'kolorist'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function main() {
  const args = process.argv.slice(2)

  // =========================
  // 🧠 Parse args
  // =========================
  let name = args.find(arg => !arg.startsWith('--'))

  let features: string[] = args
    .filter(arg => arg.startsWith('--') && !arg.startsWith('--template='))
    .map(f => f.replace('--', ''))

  let templateName =
    args.find(a => a.startsWith('--template='))?.split('=')[1] || 'default'

  // =========================
  // 🧠 Interactive Mode
  // =========================
  if (!name) {
    const response = await prompts([
      {
        type: 'text',
        name: 'projectName',
        message: 'Project name:',
        initial: 'nuxt-app'
      },
      {
        type: 'select',
        name: 'template',
        message: 'Select template',
        choices: [
          { title: 'Default', value: 'default' },
          { title: 'Dashboard', value: 'dashboard' },
          { title: 'Landing', value: 'landing' },
          { title: 'SaaS', value: 'saas' }
        ]
      },
      {
        type: 'multiselect',
        name: 'features',
        message: 'Select features',
        choices: [
          { title: 'Auth', value: 'auth' },
          { title: 'Tailwind', value: 'tailwind' },
          { title: 'API Layer', value: 'api' },
          { title: 'Linting (ESLint + Prettier)', value: 'lint' }
        ]
      }
    ])

    if (!response.projectName) {
      console.log(red('❌ Operation cancelled'))
      process.exit(1)
    }

    name = response.projectName
    features = response.features || []
    templateName = response.template || 'default'
  }

  // =========================
  // ✅ Safety
  // =========================
  if (!name) {
    console.error(red('❌ Project name is required'))
    process.exit(1)
  }

  const projectPath = path.resolve(process.cwd(), name)
  const templatePath = path.resolve(__dirname, '../template')

  if (fs.existsSync(projectPath)) {
    console.error(red(`❌ Folder "${name}" already exists`))
    process.exit(1)
  }

  // =========================
  // 📁 Copy Template
  // =========================
  console.log(cyan(`📁 Creating project with "${templateName}" template...`))

  let selectedTemplatePath = path.join(
    templatePath,
    'templates',
    templateName
  )

  if (!fs.existsSync(selectedTemplatePath)) {
    console.log(yellow('⚠️ Template not found, using default'))
    selectedTemplatePath = path.join(templatePath, 'templates/default')
  }

  await fs.copy(selectedTemplatePath, projectPath)

  // =========================
  // 📦 Package Manager
  // =========================
  const hasPnpm = fs.existsSync(path.join(projectPath, 'pnpm-lock.yaml'))
  const pkgManager = hasPnpm ? 'pnpm' : 'npm'

  const flags = {
    auth: features.includes('auth'),
    tailwind: features.includes('tailwind'),
    api: features.includes('api'),
    lint: features.includes('lint')
  }

  // =========================
  // 🔐 Auth
  // =========================
  if (flags.auth) {
    console.log('🔐 Adding auth...')
    await fs.copy(
      path.join(templatePath, 'features/auth'),
      projectPath,
      { overwrite: false }
    )
  }

  // =========================
  // 🌍 API
  // =========================
  if (flags.api) {
    console.log('🌍 Adding API...')
    await fs.copy(
      path.join(templatePath, 'features/api'),
      projectPath,
      { overwrite: false }
    )
  }

  // =========================
  // 🎨 Tailwind
  // =========================
  if (flags.tailwind) {
    console.log('🎨 Adding Tailwind...')

    try {
      execSync(
        pkgManager === 'pnpm'
          ? 'pnpm add -D @nuxtjs/tailwindcss tailwindcss@3'
          : 'npm install -D @nuxtjs/tailwindcss tailwindcss@3',
        { cwd: projectPath, stdio: 'inherit' }
      )

      const configPath = path.join(projectPath, 'nuxt.config.ts')
      let config = await fs.readFile(configPath, 'utf-8')

      if (!config.includes('@nuxtjs/tailwindcss')) {
        config = config.replace(
          'export default defineNuxtConfig({',
          `export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],`
        )
      }

      await fs.writeFile(configPath, config)
    } catch {
      console.log(yellow('⚠️ Tailwind install failed'))
    }
  }

  // =========================
  // 🧹 Lint
  // =========================
  if (flags.lint) {
    console.log('🧹 Setting up lint...')

    try {
      execSync(
        pkgManager === 'pnpm'
          ? 'pnpm add -D eslint prettier eslint-config-prettier eslint-plugin-vue husky lint-staged'
          : 'npm install -D eslint prettier eslint-config-prettier eslint-plugin-vue husky lint-staged',
        { cwd: projectPath, stdio: 'inherit' }
      )

      await fs.writeJson(
        path.join(projectPath, '.prettierrc'),
        { semi: false, singleQuote: true },
        { spaces: 2 }
      )

      await fs.writeJson(
        path.join(projectPath, '.eslintrc.json'),
        {
          extends: [
            'eslint:recommended',
            'plugin:vue/vue3-essential',
            'prettier'
          ]
        },
        { spaces: 2 }
      )

      execSync('npx husky install', { cwd: projectPath })
      execSync('npx husky add .husky/pre-commit "npx lint-staged"', {
        cwd: projectPath
      })
    } catch {
      console.log(yellow('⚠️ Lint setup failed'))
    }
  }

  // =========================
  // 📦 Install
  // =========================
  console.log(cyan('\n📦 Installing dependencies...'))

  try {
    execSync(
      pkgManager === 'pnpm' ? 'pnpm install' : 'npm install',
      { cwd: projectPath, stdio: 'inherit' }
    )
  } catch {
    console.log(yellow('⚠️ Install failed'))
  }

  // =========================
  // 🧬 Git Init
  // =========================
  console.log(cyan('\n🔧 Initializing git...'))

  try {
    execSync('git init', { cwd: projectPath })
    execSync('git add .', { cwd: projectPath })
    execSync('git commit -m "initial commit 🚀"', {
      cwd: projectPath
    })
  } catch {
    console.log(yellow('⚠️ Git init skipped'))
  }

  // =========================
  // 🎉 Done
  // =========================
  console.log(green(`\n🚀 Project ready: ${name}`))
  console.log(cyan(`\nNext steps:`))
  console.log(`cd ${name}`)
  console.log(`${pkgManager} run dev\n`)
}

main()