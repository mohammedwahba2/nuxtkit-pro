<script setup lang="ts">
const route = useRoute()
const { login, pending, error, loggedIn } = useAuth()

const form = reactive({
  email: 'admin@nuxtkit.dev',
  password: 'nuxtkit'
})

watchEffect(async () => {
  if (loggedIn.value) {
    await navigateTo(typeof route.query.redirect === 'string' ? route.query.redirect : '/account')
  }
})

async function submit() {
  await login(form)
  await navigateTo(typeof route.query.redirect === 'string' ? route.query.redirect : '/account')
}
</script>

<template>
  <section class="auth-page">
    <div class="surface auth-card">
      <div class="stack">
        <span class="eyebrow">Auth feature</span>
        <h1>Sign in to continue</h1>
        <p class="muted">
          Demo credentials are prefilled. Submit the form to create a persisted mock session.
        </p>
      </div>

      <form class="stack" @submit.prevent="submit">
        <label class="field">
          <span>Email</span>
          <input v-model="form.email" type="email" required />
        </label>

        <label class="field">
          <span>Password</span>
          <input v-model="form.password" type="password" required />
        </label>

        <p v-if="error" class="error-text">{{ error }}</p>

        <button class="button" type="submit" :disabled="pending">
          {{ pending ? 'Signing in...' : 'Sign in' }}
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.auth-page {
  min-height: calc(100vh - 4rem);
  display: grid;
  place-items: center;
}

.auth-card {
  width: min(100%, 460px);
  padding: 2rem;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 5vw, 3rem);
  letter-spacing: -0.05em;
}

.field {
  display: grid;
  gap: 0.4rem;
}

.field span {
  font-size: 0.95rem;
  color: var(--muted);
}

.field input {
  min-height: 48px;
  padding: 0 0.9rem;
  border-radius: 14px;
  border: 1px solid var(--surface-border);
  background: white;
  color: var(--text);
}

.error-text {
  color: #b91c1c;
  margin: 0;
}
</style>
