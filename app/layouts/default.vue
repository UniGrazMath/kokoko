<template>
  <SiteHeader />
  <img
    :src="withBase('/img/banner.jpg')"
    alt=""
    width="1920"
    height="491"
    class="w-full"
  >
  <main class="container mx-auto px-4 py-8">
    <section class="container max-w-screen-xl mx-auto">
      <slot />
    </section>
  </main>
  <SiteFooter />
</template>
