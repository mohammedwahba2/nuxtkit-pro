<script setup>
const { toasts } = useToast()
</script>

<template>
  <div class="fixed top-5 right-5 space-y-2 z-50">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="px-4 py-2 rounded text-white shadow"
      :class="toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'"
    >
      {{ toast.message }}
    </div>
  </div>
</template>