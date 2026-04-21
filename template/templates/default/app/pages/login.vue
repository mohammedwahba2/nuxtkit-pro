<script setup>
const email = ref('')
const password = ref('')
const { login } = useAuth()

const handleLogin = () => {
  login({ name: email.value })
}

definePageMeta({
  layout: 'auth'
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md bg-white p-8 rounded-xl shadow">
      
      <h2 class="text-2xl font-bold mb-6 text-center">
        Login 🔐
      </h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        
        <input
          v-model="email"
          type="text"
          placeholder="Email"
          class="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>

      </form>

    </div>
  </div>
</template>