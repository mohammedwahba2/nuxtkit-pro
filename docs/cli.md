# CLI Reference

## Usage

```bash
nuxtkit-pro <project-name> [options]
```

## Arguments

### `<project-name>`

Target directory name for the generated app.

```bash
npx nuxtkit-pro my-app
```

## Flags

### `--template=<name>`

Select a template.

Available values:

- `default`
- `dashboard`
- `landing`
- `saas`

Example:

```bash
npx nuxtkit-pro my-app --template=dashboard
```

### `--auth`

Add the auth feature pack.

```bash
npx nuxtkit-pro my-app --auth
```

### `--api`

Add the API feature pack.

```bash
npx nuxtkit-pro my-app --api
```

### `--tailwind`

Add Tailwind CSS setup.

```bash
npx nuxtkit-pro my-app --tailwind
```

### `--lint`

Add ESLint, Prettier, Husky, and lint-staged.

```bash
npx nuxtkit-pro my-app --lint
```

### `--package-manager=<name>`

Choose the package manager used for install commands.

Available values:

- `npm`
- `pnpm`
- `yarn`
- `bun`

Example:

```bash
npx nuxtkit-pro my-app --package-manager=pnpm
```

### `--no-install`

Skip dependency installation.

```bash
npx nuxtkit-pro my-app --no-install
```

### `--no-git`

Skip `git init`.

```bash
npx nuxtkit-pro my-app --no-git
```

### `--yes`

Skip interactive prompts and use the provided arguments directly.

```bash
npx nuxtkit-pro my-app --template=saas --yes
```

## Example Commands

### Basic app

```bash
npx nuxtkit-pro my-app
```

### Dashboard app with auth

```bash
npx nuxtkit-pro admin-panel --template=dashboard --auth
```

### Marketing site with Tailwind

```bash
npx nuxtkit-pro launch-site --template=landing --tailwind
```

### Full setup

```bash
npx nuxtkit-pro ops-console --template=dashboard --auth --api --tailwind --lint
```
