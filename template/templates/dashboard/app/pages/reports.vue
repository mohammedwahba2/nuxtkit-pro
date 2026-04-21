<template>
  <section class="surface reports">
    <div class="stack">
      <span class="eyebrow">Reports</span>
      <h1>Weekly delivery summary</h1>
      <p class="muted">Use this route for charts, audit logs, or team performance snapshots.</p>
    </div>

    <div class="grid report-grid">
      <article class="stat-card">
        <strong>Completed tickets</strong>
        <p class="muted">147 issues moved to done this week.</p>
      </article>
      <article class="stat-card">
        <strong>Customer health</strong>
        <p class="muted">Nine accounts were flagged for onboarding follow-up.</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.reports {
  padding: 2rem;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
  letter-spacing: -0.05em;
}

.report-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

@media (max-width: 900px) {
  .report-grid {
    grid-template-columns: 1fr;
  }
}
</style>
