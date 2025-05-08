<script setup lang="ts">
const {data: meetings} = await useAsyncData('meetings', () => queryCollection('meetings').first())

const reversed_meetings = computed(() => {
  return meetings.value?.meetings.reverse();
})

definePageMeta({
  layout: "default"
})
</script>

<template>
  <div class="px-10 pb-8 lg:px-20">
    <div class="text-xl text-primary-950 font-serif">
        The <i>Koralm Kombinatorik Kolloquium (&ldquo;KoKoKo&rdquo;)</i> is an annual workshop
        on <i>enumerative and analytic combinatorics</i> usually held
        on either side of the Koralm in Austria.
    </div>
  </div>

<section v-for="meeting in reversed_meetings" class="mb-8">
  <Meeting :meeting="meeting"></Meeting>
</section>

</template>
