<script setup lang="ts">
</script>

<template>
    <Navigation></Navigation>
    <NuxtImg src="/img/banner.jpg" quality="100" class="w-full" />
    <main class="container mx-auto px-4 py-8">
        <section class="container max-w-screen-xl mx-auto">
            <slot></slot>
        </section>
    </main>
    <Footer></Footer>
</template>