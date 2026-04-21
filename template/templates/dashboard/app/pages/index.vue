<template>
  <section class="grid dashboard">
    <div class="surface hero">
      <span class="eyebrow">Dashboard template</span>
      <h1>Operational clarity without the starter noise.</h1>
      <p class="muted">
        A dashboard-focused shell with room for protected routes, API-backed widgets,
        and internal tooling surfaces.
      </p>
    </div>

    <div class="grid metrics">
      <article class="stat-card">
        <span class="metric-label">Revenue</span>
        <strong>$84.2k</strong>
        <p class="muted">Up 18% from the previous cycle.</p>
      </article>
      <article class="stat-card">
        <span class="metric-label">Deployments</span>
        <strong>23</strong>
        <p class="muted">Zero failed builds in the past seven days.</p>
      </article>
      <article class="stat-card">
        <span class="metric-label">Latency</span>
        <strong>84ms</strong>
        <p class="muted">Average edge response for public routes.</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.dashboard {
  gap: 1rem;
  padding-top: 0.2rem;
}

.hero {
  padding: 1.8rem;
}

h1 {
  margin: 0.75rem 0;
  font-size: clamp(2rem, 4vw, 3.25rem);
  line-height: 1;
  letter-spacing: -0.05em;
}

.metrics {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.metric-label {
  display: block;
  margin-bottom: 0.7rem;
  color: var(--muted);
}

@media (max-width: 900px) {
  .metrics {
    grid-template-columns: 1fr;
  }
}
</style>
