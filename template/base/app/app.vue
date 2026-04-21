<template>
  <div class="app-root">
    <NuxtLoadingIndicator color="#0f172a" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
:root {
  color-scheme: light;
  --page-bg: #f8fafc;
  --surface: rgba(255, 255, 255, 0.94);
  --surface-border: rgba(15, 23, 42, 0.08);
  --text: #0f172a;
  --muted: #475569;
  --brand: #0f172a;
  --accent: #2563eb;
  --accent-soft: rgba(37, 99, 235, 0.14);
  --shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body,
#__nuxt {
  min-height: 100%;
  margin: 0;
}

body {
  background:
    radial-gradient(circle at top, rgba(59, 130, 246, 0.12), transparent 32%),
    linear-gradient(180deg, #ffffff 0%, var(--page-bg) 100%);
  color: var(--text);
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea,
select {
  font: inherit;
}

.app-root {
  min-height: 100vh;
}

.page-shell {
  width: min(1120px, calc(100vw - 2rem));
  margin: 0 auto;
}

.surface {
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-radius: 24px;
  box-shadow: var(--shadow);
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 0.9rem;
  font-weight: 600;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 44px;
  padding: 0 1rem;
  border: 0;
  border-radius: 999px;
  background: var(--brand);
  color: white;
  cursor: pointer;
  transition:
    transform 140ms ease,
    opacity 140ms ease;
}

.button:hover {
  opacity: 0.94;
  transform: translateY(-1px);
}

.button.secondary {
  background: white;
  color: var(--text);
  border: 1px solid var(--surface-border);
}

.grid {
  display: grid;
  gap: 1.25rem;
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.muted {
  color: var(--muted);
}

.stat-card {
  padding: 1.25rem;
  border-radius: 20px;
  border: 1px solid var(--surface-border);
  background: white;
}

@media (max-width: 768px) {
  .page-shell {
    width: min(100vw - 1rem, 1120px);
  }
}
</style>
