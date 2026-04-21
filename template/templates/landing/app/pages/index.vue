<template>
  <section class="landing-page">
    <div class="surface spotlight">
      <span class="eyebrow">Landing template</span>
      <h1>Launch a polished marketing page from the first scaffold.</h1>
      <p class="muted">
        This template focuses on messaging, social proof, and a conversion-first layout
        without sacrificing Nuxt structure.
      </p>

      <div class="actions">
        <a class="button" href="#pricing">View pricing</a>
        <a class="button secondary" href="#proof">See proof</a>
      </div>
    </div>

    <div id="proof" class="grid proof-grid">
      <article class="stat-card">
        <strong>Fast content iteration</strong>
        <p class="muted">Swap sections or wire CMS data without reshaping the app shell.</p>
      </article>
      <article class="stat-card">
        <strong>Built for demos</strong>
        <p class="muted">A strong default layout for product launches and feature announcements.</p>
      </article>
      <article class="stat-card">
        <strong>Works on mobile</strong>
        <p class="muted">The layout scales cleanly from small screens to wide hero sections.</p>
      </article>
    </div>

    <section id="pricing" class="surface pricing">
      <div>
        <span class="eyebrow">Simple pricing</span>
        <h2>Keep the stack lean and the offer clear.</h2>
      </div>
      <div class="price-card">
        <strong>$29</strong>
        <p class="muted">Starter plan for product launches, experiments, and campaign pages.</p>
      </div>
    </section>
  </section>
</template>

<style scoped>
.landing-page {
  display: grid;
  gap: 1rem;
}

.spotlight,
.pricing {
  padding: 2rem;
}

h1,
h2 {
  margin: 0.75rem 0 0;
  letter-spacing: -0.05em;
}

h1 {
  font-size: clamp(2.4rem, 6vw, 4.4rem);
  line-height: 0.97;
}

h2 {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.proof-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.pricing {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 1rem;
  align-items: center;
}

.price-card {
  padding: 1.5rem;
  border-radius: 20px;
  background: white;
  border: 1px solid var(--surface-border);
}

.price-card strong {
  font-size: 3rem;
  letter-spacing: -0.06em;
}

@media (max-width: 900px) {
  .proof-grid,
  .pricing {
    grid-template-columns: 1fr;
  }
}
</style>
