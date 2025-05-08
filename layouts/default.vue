<script setup lang="ts">
</script>

<template>
    <Navigation></Navigation>
    <img src="/img/banner.jpg" />
    <main class="container mx-auto px-4 py-8">
        <section class="container max-w-screen-xl mx-auto">
            <slot></slot>
        </section>
    </main>
    <Footer></Footer>
</template>