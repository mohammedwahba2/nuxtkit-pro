<template>
  <section class="saas-page">
    <div class="surface hero">
      <div class="stack">
        <span class="eyebrow">SaaS template</span>
        <h1>Present your product like it already has momentum.</h1>
        <p class="muted">
          Use this template for subscription products, internal platforms, or AI tools
          that need a clear value proposition and room for growth.
        </p>
      </div>

      <div class="surface mini-board">
        <div class="mini-row">
          <span class="muted">Active workspaces</span>
          <strong>1,284</strong>
        </div>
        <div class="mini-row">
          <span class="muted">Automations saved</span>
          <strong>34h / wk</strong>
        </div>
      </div>
    </div>

    <div class="grid highlights">
      <article class="stat-card">
        <strong>Fast onboarding</strong>
        <p class="muted">The first-run experience already feels like a product shell.</p>
      </article>
      <article class="stat-card">
        <strong>Feature-ready routes</strong>
        <p class="muted">Works well with auth, account pages, and internal API demos.</p>
      </article>
      <article class="stat-card">
        <strong>Minimal friction</strong>
        <p class="muted">Core Nuxt files stay lean so you can keep shipping instead of refactoring.</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.saas-page {
  display: grid;
  gap: 1rem;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 1rem;
  padding: 2rem;
}

h1 {
  margin: 0;
  font-size: clamp(2.4rem, 5vw, 4rem);
  line-height: 0.97;
  letter-spacing: -0.05em;
}

.mini-board {
  padding: 1.25rem;
}

.mini-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.9rem 0;
  border-bottom: 1px solid var(--surface-border);
}

.mini-row:last-child {
  border-bottom: 0;
}

.highlights {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 900px) {
  .hero,
  .highlights {
    grid-template-columns: 1fr;
  }
}
</style>
