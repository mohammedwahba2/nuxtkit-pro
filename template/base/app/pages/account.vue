<template>
  <section class="surface placeholder-page">
    <div class="stack">
      <span class="eyebrow">Optional auth route</span>
      <h1>Add the auth feature pack to protect this page.</h1>
      <p class="muted">
        Generate with `--auth` to install a working login flow, route middleware,
        persisted session state, and a protected account page.
      </p>
    </div>
  </section>
</template>

<style scoped>
.placeholder-page {
  padding: 2rem;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
  letter-spacing: -0.05em;
}
</style>
