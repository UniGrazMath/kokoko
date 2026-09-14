<script setup lang="ts">
import { siteTitle } from '#shared/site'
</script>

<template>
  <header class="bg-white shadow">
    <div class="container mx-auto px-4 py-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold font-serif">
        <NuxtLink to="/">
          {{ siteTitle }}
        </NuxtLink>
      </h1>
    </div>
  </header>
</template>
