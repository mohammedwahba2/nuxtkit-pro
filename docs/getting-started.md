# Getting Started

## What NuxtKit Pro Does

NuxtKit Pro scaffolds Nuxt 4 applications with a base app, a selected template, and optional feature packs. The generated project is ready to install and run.

## Run the CLI

```bash
npx nuxtkit-pro my-app
```

You can also install it globally:

```bash
npm install -g nuxtkit-pro
nuxtkit-pro my-app
```

## First Project

Create a new app:

```bash
npx nuxtkit-pro my-app
```

Create a dashboard app with auth and API routes:

```bash
npx nuxtkit-pro my-dashboard --template=dashboard --auth --api
```

## What Gets Generated

Every project starts with:

- a Nuxt 4 app shell
- base layouts and starter pages
- a selected template layer
- optional feature files merged into the project
- `nuxt.config.ts`
- `package.json`

Typical output:

```text
my-app/
  app/
    layouts/
    pages/
  server/
    api/
  services/
  nuxt.config.ts
  package.json
  tsconfig.json
```

## Install Dependencies

If you did not skip installation:

```bash
cd my-app
npm install
```

## Start Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Next Steps

- Review the available [templates](templates.md)
- Add optional [features](features.md)
- Check the full [CLI reference](cli.md)
