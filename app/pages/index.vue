<script setup lang="ts">
import meetings from '#build/kokoko-content/meetings'
</script>

<template>
  <div class="px-10 pb-8 lg:px-20">
    <p class="text-xl text-primary-950 font-serif">
      The <i>Koralm Kombinatorik Kolloquium (&ldquo;KoKoKo&rdquo;)</i> is an annual workshop
      on <i>enumerative and analytic combinatorics</i> usually held
      on either side of the Koralm in Austria.
    </p>
  </div>

  <section v-for="meeting in meetings" :key="meeting.year" class="mb-8">
    <MeetingSection :meeting="meeting" />
  </section>
</template>
