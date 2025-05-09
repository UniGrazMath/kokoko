<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<template>
  <header class="bg-white shadow">
    <div class="container mx-auto px-4 py-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold font-serif">
        <NuxtLink to="/">
          {{ runtimeConfig.public.siteTitle }}
        </NuxtLink>
      </h1>
    </div>
  </header>
</template>