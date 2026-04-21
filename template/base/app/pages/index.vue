<script setup>
definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">
      Dashboard 🚀
    </h1>

    <div class="bg-white p-6 rounded shadow">
      <p class="text-gray-600">Welcome back 👋</p>
      <p class="text-lg font-semibold mt-2">
        {{ user?.name }}
      </p>
    </div>
  </div>
</template>