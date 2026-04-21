# Features

## Auth

The auth feature adds a complete mock auth flow for starter projects.

Generated files:

- `app/composables/useAuth.ts`
- `app/middleware/auth.ts`
- `app/pages/login.vue`
- `app/pages/account.vue`
- `server/api/auth/login.post.ts`

What it does:

- stores user and token state with `useState`
- persists auth state with cookies
- redirects protected routes to `/login`
- provides login and logout methods

Demo credentials:

```text
admin@nuxtkit.dev
nuxtkit
```

## API

The API feature adds a minimal service layer backed by a real Nitro route.

Generated files:

- `server/api/hello.get.ts`
- `services/api.ts`
- `app/composables/useApi.ts`
- `app/pages/api-demo.vue`

What it does:

- exposes a working `/api/hello` endpoint
- wraps requests in a small service module
- provides a composable for page-level usage
- includes a page that fetches and renders live API data

## Tailwind

The Tailwind feature wires Tailwind CSS into the generated app.

Generated files:

- `app/assets/css/tailwind.css`
- `tailwind.config.ts`
- `postcss.config.js`

It also updates:

- `nuxt.config.ts`
- `package.json`

What it does:

- installs `@nuxtjs/tailwindcss`
- adds the Tailwind module once
- registers the CSS entry safely

## Linting

The lint feature adds a standard local workflow for formatting and checks.

Generated files:

- `.eslintrc.json`
- `.eslintignore`
- `.prettierrc`
- `.prettierignore`
- `.husky/pre-commit`

It also updates:

- `package.json`

What it does:

- adds ESLint for code checks
- adds Prettier for formatting
- runs `lint-staged` on pre-commit
- keeps the generated app ready for team work
