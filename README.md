# NuxtKit Pro 🚀

Scaffold Nuxt 4 apps in seconds with a clean structure, ready-to-use templates, and optional features.

---

## ✨ What is this?

NuxtKit Pro is a CLI tool that helps you start Nuxt projects faster without wasting time on setup.

Instead of configuring everything from scratch, you get a working app with a solid structure out of the box.

---

## ⚡ Quick Start

```bash
npx nuxtkit-pro my-app
cd my-app
npm run dev
```

---

## 🧩 Features

* 📦 Pre-built templates (default, dashboard, landing, saas)
* 🔐 Auth ready (basic flow + middleware)
* 🌍 API layer structure
* 🎨 Tailwind CSS setup (optional)
* 🧹 ESLint + Prettier (optional)
* 🧬 Git initialized automatically

---

## 🛠 Usage

### Create project with flags

```bash
npx nuxtkit-pro my-app --auth --tailwind
```

### Use specific template

```bash
npx nuxtkit-pro my-app --template=dashboard
```

---

## 📁 Project Structure

```
app/
  components/
  pages/
  layouts/
  composables/

server/
  api/

services/
```

---

## 🧠 Why?

Most starters are either:

* too minimal
* or too bloated

This one tries to stay in the middle:
clean, scalable, and easy to extend.

---

## 📌 Roadmap

* [ ] More templates
* [ ] Better auth integrations
* [ ] UI components library
* [ ] Plugin system

---

## 🤝 Contributing

PRs are welcome. If you have ideas or improvements, feel free to open an issue.

---

## 📄 License

MIT
