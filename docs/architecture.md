# Architecture

## Generated Structure

```text
app/
  layouts/
  pages/
  composables/
  middleware/
  assets/
server/
  api/
services/
nuxt.config.ts
package.json
tsconfig.json
```

## `app/`

The `app/` directory holds the client-side application layer.

Typical contents:

- `layouts/` for application shells
- `pages/` for route components
- `composables/` for reusable client logic
- `middleware/` for route guards
- `assets/` for local styles such as Tailwind entry files

Keep UI, route behavior, and client state here.

## `server/`

The `server/` directory holds Nitro server routes.

Typical contents:

- `api/` for backend endpoints used by the frontend

Use this layer for:

- mock endpoints
- server-side data shaping
- app-specific backend handlers

## `services/`

The `services/` directory is the thin request layer between pages and server routes.

Use it for:

- API request functions
- fetch wrappers
- shared request logic

Pages and composables should call services instead of embedding request details everywhere.

## `composables/`

Composables expose reusable client logic to pages and components.

Examples:

- `useAuth()` for auth state and actions
- `useApi()` for frontend API helpers

Keep composables focused on state, orchestration, and view-facing behavior.

## Flow

Typical request flow:

```text
page -> composable -> service -> server/api
```

Typical auth flow:

```text
page -> useAuth() -> /api/auth/login -> state + cookies -> middleware
```

## Template and Feature Layers

NuxtKit Pro builds projects in three passes:

1. Base app files
2. Template-specific overrides
3. Optional feature packs

That keeps the generated project easy to reason about while still allowing different app shapes from the CLI.
