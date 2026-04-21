<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { user, logout } = useAuth()
</script>

<template>
  <section class="surface account-page">
    <div class="stack">
      <span class="eyebrow">Protected route</span>
      <h1>Account</h1>
      <p class="muted">
        This page is guarded by middleware and redirects to `/login` when the session is missing.
      </p>
    </div>

    <div class="stat-card">
      <p class="muted">Signed in as</p>
      <strong>{{ user?.name }}</strong>
      <p class="muted">{{ user?.email }}</p>
    </div>

    <button class="button secondary" type="button" @click="logout">
      Sign out
    </button>
  </section>
</template>

<style scoped>
.account-page {
  display: grid;
  gap: 1rem;
  padding: 2rem;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
  letter-spacing: -0.05em;
}
</style>
