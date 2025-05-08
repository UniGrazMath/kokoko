<script setup lang="ts">
</script>

<template>
  <footer class="bg-white shadow mt-8">
    <div class="container mx-auto px-4 py-6 flex flex-wrap font-sans">
      <div class="self-end">
        <h6 class="text-sm font-bold text-gray-600">
          Contact &amp; Responsibility for Content
        </h6>
        <div class="text-[10px] font-sans text-gray-600">
          Department of Mathematics and Scientific Computing<br>
          University of Graz<br>
          Heinrichstraße 36, 8010 Graz<br>
          <a class="hover:text-gray-800" href="mailto:mathematik@uni-graz.at">mathematik@uni-graz.at</a><br>
          <a class="hover:text-gray-800" href="https://mathematik.uni-graz.at">mathematik.uni-graz.at</a>
        </div>
      </div>
      <div class="ml-auto self-end text-sm text-right text-gray-600">
        <div class="mb-2 mt-4 xs:mt-0">
          Made with
          <span class="text-primary inline-block h-[14px]">
            <MdiIcon preserveAspectRatio="xMidYMid meet" icon="mdiHeart"></MdiIcon>
          </span>
          by <a class="underline hover:text-sky-900" href="https://behackl.dev">behackl</a>
        </div>
        <div>
          &copy; <NuxtTime :datetime="Date.now()" year="numeric"></NuxtTime>
        </div>
      </div>
    </div>
  </footer>
</template>
