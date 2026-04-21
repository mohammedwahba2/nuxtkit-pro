<template>
  <section class="surface starter-page">
    <div class="stack">
      <span class="eyebrow">Default template</span>
      <h1>Start with a balanced Nuxt foundation.</h1>
      <p class="muted">
        The default template keeps the UI minimal and leaves room for feature packs
        such as auth, API helpers, Tailwind, and linting to layer in cleanly.
      </p>
    </div>

    <div class="grid feature-grid">
      <article class="stat-card">
        <strong>Composable structure</strong>
        <p class="muted">Core client logic lives in the right place from the first commit.</p>
      </article>
      <article class="stat-card">
        <strong>Server routes ready</strong>
        <p class="muted">Nitro endpoints can be added without reshaping the project structure.</p>
      </article>
      <article class="stat-card">
        <strong>Upgrade-friendly</strong>
        <p class="muted">Templates only override what they need, so merges stay predictable.</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.starter-page {
  padding: 2rem;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 5vw, 3.6rem);
  line-height: 1;
  letter-spacing: -0.05em;
}

.feature-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 1rem;
}

@media (max-width: 900px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
