<script setup>
const { isAuthenticated, logout, user } = useAuth()
</script>

<template>
  <div>
    <!-- 🔥 Navbar -->
    <nav class="flex items-center justify-between p-4 border-b bg-white">
      <h1 class="text-xl font-bold">Nuxt Starter 🚀</h1>

      <div class="flex gap-4 items-center">
        <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
        <NuxtLink to="/users">Users</NuxtLink>
        <NuxtLink
          v-if="!isAuthenticated"
          to="/login"
          class="hover:underline"
        >
          Login
        </NuxtLink>

        <div v-else class="flex items-center gap-3">
          <span class="text-sm text-gray-600">
            Hi, {{ user?.name }}
          </span>

          <button
            class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>

    <!-- 🔥 Page Content -->
    <main class="p-6">
      <slot />
    </main>
  </div>
</template>