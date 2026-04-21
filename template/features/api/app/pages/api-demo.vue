<script setup lang="ts">
const { hello } = useApi()
const { data, pending, error, refresh } = await useAsyncData('api-demo', () => hello())
</script>

<template>
  <section class="surface api-page">
    <div class="stack">
      <span class="eyebrow">API feature</span>
      <h1>Server route connected</h1>
      <p class="muted">
        This page uses the generated service layer and composable to fetch live data from
        `/api/hello`.
      </p>
    </div>

    <div class="stat-card">
      <p v-if="pending" class="muted">Loading API response...</p>
      <p v-else-if="error" class="error-text">{{ error.message }}</p>
      <div v-else class="stack">
        <strong>{{ data?.message }}</strong>
        <p class="muted">Timestamp: {{ data?.timestamp }}</p>
      </div>
    </div>

    <button class="button secondary" type="button" @click="refresh">
      Refresh
    </button>
  </section>
</template>

<style scoped>
.api-page {
  display: grid;
  gap: 1rem;
  padding: 2rem;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
  letter-spacing: -0.05em;
}

.error-text {
  color: #b91c1c;
  margin: 0;
}
</style>
