<template>
  <div class="layout-shell">
    <header class="page-shell topbar">
      <NuxtLink class="brand-mark" to="/">
        <span class="brand-badge">N</span>
        <span>NuxtKit Pro</span>
      </NuxtLink>

      <nav class="nav-links">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/account">Account</NuxtLink>
        <NuxtLink to="/api-demo">API Demo</NuxtLink>
      </nav>
    </header>

    <main class="page-shell content-shell">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout-shell {
  min-height: 100vh;
  padding: 1rem 0 2rem;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.brand-badge {
  display: inline-grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.85rem;
  background: #0f172a;
  color: white;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--muted);
}

.content-shell {
  padding-bottom: 2rem;
}

@media (max-width: 768px) {
  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-links {
    flex-wrap: wrap;
  }
}
</style>
