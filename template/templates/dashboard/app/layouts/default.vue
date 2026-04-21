<template>
  <div class="dashboard-layout">
    <aside class="surface sidebar">
      <div class="brand">
        <span class="brand-badge">N</span>
        <div>
          <strong>NuxtKit Pro</strong>
          <p class="muted">Dashboard template</p>
        </div>
      </div>

      <nav class="menu">
        <NuxtLink to="/">Overview</NuxtLink>
        <NuxtLink to="/reports">Reports</NuxtLink>
        <NuxtLink to="/account">Account</NuxtLink>
        <NuxtLink to="/api-demo">API Demo</NuxtLink>
      </nav>
    </aside>

    <main class="main-panel">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 1rem;
  min-height: 100vh;
  width: min(1280px, calc(100vw - 2rem));
  margin: 0 auto;
  padding: 1rem 0 2rem;
}

.sidebar {
  padding: 1.25rem;
  align-self: start;
  position: sticky;
  top: 1rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 2rem;
}

.brand-badge {
  display: inline-grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.9rem;
  background: #0f172a;
  color: white;
  font-weight: 700;
}

.menu {
  display: grid;
  gap: 0.75rem;
  color: var(--muted);
}

@media (max-width: 960px) {
  .dashboard-layout {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
  }

  .menu {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
