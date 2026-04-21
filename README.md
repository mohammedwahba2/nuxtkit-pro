# NuxtKit Pro

NuxtKit Pro is a Nuxt 4 scaffolding CLI for developers who want a solid starting point without spending the first hour wiring the same pieces together again.

It generates clean Nuxt projects from curated templates, lets you layer in common feature packs, and keeps the command-line experience fast, predictable, and easy to automate.

## Features

- Nuxt 4 starter generation with multiple templates
- Optional feature packs for auth, API routes, Tailwind CSS, and linting
- Interactive mode for guided setup
- Non-interactive mode for automation and CI
- Safe template fallback and defensive file handling
- Dependency installation and git initialization built in

## Installation

Run it directly with `npx`:

```bash
npx nuxtkit-pro@latest my-app
```

Or install it globally:

```bash
npm install -g nuxtkit-pro
nuxtkit-pro my-app
```

## Usage

```bash
nuxtkit-pro <project-name> [options]
```

### Quick examples

Create a standard Nuxt app:

```bash
nuxtkit-pro my-app
```

Scaffold a dashboard with auth and API support:

```bash
nuxtkit-pro admin-panel --template=dashboard --auth --api
```

Create a landing page starter without installing dependencies:

```bash
nuxtkit-pro marketing-site --template=landing --tailwind --no-install
```

Run in non-interactive mode:

```bash
nuxtkit-pro saas-starter \
  --template=saas \
  --auth \
  --api \
  --tailwind \
  --lint \
  --package-manager=pnpm \
  --no-git \
  --yes
```

## Templates

### `default`

The general-purpose starting point. Good for most apps when you want a clean Nuxt base and no opinionated layout.

### `dashboard`

Focused on internal tools, admin panels, and products that need a structured application shell from day one.

### `landing`

Built for marketing pages, launches, and brand-forward sites that need a lightweight, content-driven starting point.

### `saas`

A SaaS-oriented starter aimed at product marketing pages and product-first websites.

## Feature Packs

### `--auth`

Adds a basic authentication flow with composables, middleware, login handling, and starter account pages.

### `--api`

Adds a simple Nitro API example, client-side utilities, and a demo page for data fetching patterns.

### `--tailwind`

Adds Tailwind CSS configuration, PostCSS setup, and a CSS entry file wired into Nuxt.

### `--lint`

Adds ESLint, Prettier, Husky, and lint-staged so the project starts with a maintainable code quality baseline.

## CLI Options

| Option | Description |
| --- | --- |
| `--template <name>` | Choose a template: `default`, `dashboard`, `landing`, `saas` |
| `--auth` | Include the authentication feature pack |
| `--api` | Include the API feature pack |
| `--tailwind` | Include the Tailwind CSS feature pack |
| `--lint` | Include the linting feature pack |
| `--package-manager <name>` | Choose `npm`, `pnpm`, or `yarn` |
| `--yes` | Skip prompts and use defaults for any missing values |
| `--no-install` | Do not run dependency installation after scaffolding |
| `--no-git` | Do not initialize a git repository |
| `-h, --help` | Show the help output |

## Example Workflow

```bash
nuxtkit-pro test-app \
  --template=dashboard \
  --auth \
  --api \
  --tailwind \
  --lint \
  --no-install \
  --no-git \
  --yes
```

Then:

```bash
cd test-app
npm install
npm run dev
```

## Contributing

Contributions are welcome. If you want to improve templates, add a new feature pack, or tighten the CLI experience, open an issue or submit a pull request.

If you plan to make a larger change, it helps to start with a short discussion so the direction stays aligned with the project.

## License

MIT
