<script setup>
definePageMeta({
  middleware: 'auth'
})

const { getUsers } = useUserApi()

const users = ref([])
const loading = ref(true)

onMounted(async () => {
  users.value = await getUsers()
  loading.value = false
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Users 👥</h1>

    <div v-if="loading">Loading...</div>

    <div v-else class="space-y-2">
      <div
        v-for="user in users"
        :key="user.id"
        class="p-4 bg-white rounded shadow"
      >
        {{ user.name }}
      </div>
    </div>
  </div>
</template>