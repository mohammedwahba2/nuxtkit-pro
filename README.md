# 🚀 NuxtKit Pro

> Powerful CLI to scaffold scalable Nuxt 4 apps with templates & features

---

## ✨ Features

* 🧱 Multiple templates

  * Default
  * Dashboard
  * SaaS
  * Landing

* 🧩 Modular features

  * 🔐 Auth
  * 🌍 API Layer
  * 🎨 Tailwind CSS
  * 🧹 Linting (ESLint + Prettier + Husky)

* ⚡ Fast project generation

* 📦 Auto install dependencies

* 🧬 Git initialized automatically

* 🧠 Interactive CLI mode

---

## 📦 Installation

```bash
npm install -g nuxtkit-pro
```

or use without install:

```bash
npx nuxtkit-pro my-app
```

---

## 🚀 Usage

### Basic

```bash
nuxtkit-pro my-app
```

### With template

```bash
nuxtkit-pro my-app --template=dashboard
```

### With features

```bash
nuxtkit-pro my-app --auth --tailwind --api --lint
```

---

## 🧠 Interactive Mode

Just run:

```bash
nuxtkit-pro
```

And choose:

* Project name
* Template
* Features

---

## 📁 Project Structure

```
template/
  templates/
    default/
    dashboard/
    landing/
    saas/
  features/
    auth/
    api/
```

---

## 🎯 Example

```bash
nuxtkit-pro my-saas --template=saas --auth --tailwind --api
```

---

## ⚙️ Requirements

* Node.js 18+
* npm / pnpm

---

## 🛠️ Development

```bash
git clone https://github.com/your-username/nuxtkit-pro
cd nuxtkit-pro
pnpm install
pnpm build
```

---

## 📦 Publish

```bash
npm publish
```

---

## 💡 Why NuxtKit Pro?

Because starting a Nuxt project shouldn't take hours.

---

## ⭐ Support

If you like this project:

* Give it a ⭐ on GitHub
* Share it with others

---

## 📄 License

MIT
