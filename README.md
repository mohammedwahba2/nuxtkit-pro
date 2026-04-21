# NuxtKit Pro

Nuxt 4 scaffolding for apps you can run on the first commit.

NuxtKit Pro creates real Nuxt 4 projects with starter templates, optional feature packs, and clean defaults for everyday development.

## Install

Run it directly:

```bash
npx nuxtkit-pro@latest my-app
```

Or install it globally:

```bash
npm install -g nuxtkit-pro
nuxtkit-pro my-app
```

## Quick Start

```bash
npx nuxtkit-pro@latest my-app
cd my-app
npm install
npm run dev
```

## Usage

```bash
nuxtkit-pro <project-name> [options]
```

### Examples

```bash
npx nuxtkit-pro@latest my-app
npx nuxtkit-pro@latest admin-panel --template=dashboard --auth --api
npx nuxtkit-pro@latest marketing-site --template=landing --tailwind
npx nuxtkit-pro@latest saas-starter --template=saas --auth --api --tailwind --lint
npx nuxtkit-pro@latest internal-tool --template=dashboard --package-manager=pnpm
```

## Features

- `--auth` adds a real login flow, route middleware, a protected account page, and a mock auth endpoint.
- `--api` adds a working Nitro endpoint, service layer, composable, and demo page.
- `--tailwind` wires in `@nuxtjs/tailwindcss` with config and CSS entry files.
- `--lint` adds ESLint, Prettier, Husky, and lint-staged.

## Templates Preview

- `default` for general-purpose Nuxt apps
- `dashboard` for admin panels and internal tools
- `landing` for marketing sites and launch pages
- `saas` for product-first SaaS home pages

## CLI Flags

- `--template=<default|dashboard|landing|saas>`
- `--auth`
- `--api`
- `--tailwind`
- `--lint`
- `--package-manager=<npm|pnpm|yarn|bun>`
- `--no-install`
- `--no-git`
- `--yes`

## Example

Generate a dashboard app with auth, API routes, Tailwind, and linting:

```bash
npx nuxtkit-pro@latest ops-console \
  --template=dashboard \
  --auth \
  --api \
  --tailwind \
  --lint

cd ops-console
npm install
npm run dev
```

## Example Output

```text
NuxtKit Pro v1.0.0
Nuxt 4 project scaffolder

✔ Created ops-console using the dashboard template
› Applying auth feature
› Applying API feature
› Applying Tailwind feature
› Applying linting feature
√ Project ready

Template:
  dashboard

Features:
  auth, api, tailwind, lint

Next steps:
  cd ops-console
  npm install
  npm run dev
```

## Why Use It

- Starts from a working Nuxt 4 app, not an empty shell
- Keeps templates and features modular
- Merges scaffolds safely without clobbering critical files
- Produces apps you can run immediately
- Keeps the generated structure simple enough to own

## License

MIT
