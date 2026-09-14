<script setup lang="ts">
import type { Meeting } from '#shared/content'

defineProps<{ meeting: Meeting }>()
</script>

<template>
  <h3 class="mb-2 font-sans font-bold text-xl inline-flex flex-wrap">
    <span class="text-4xl mr-2">{{ meeting.year }}</span>
    <div v-if="meeting.date">
      <span
        class="px-2 py-1 text-sm border-1 border-primary-800 bg-primary-800 text-white rounded-xl self-end mr-2"
      >
        {{ meeting.date }}
      </span>
      <span class="self-end">{{ meeting.location }}</span>
    </div>
  </h3>

  <div
    v-if="meeting.announcement"
    class="flex flex-row border-3 my-2 p-4 border-primary rounded-xl bg-primary-100"
  >
    <SiteIcon name="bell" class="my-auto mr-2 text-primary-700" :size="24" />
    <div class="flex-1 my-auto">{{ meeting.announcement }}</div>
  </div>

  <p v-if="meeting.organizers.length" class="pb-3 pt-0 opacity-80">
    {{ meeting.organizers.length > 1 ? 'Organizers:' : 'Organizer:' }}
    {{ meeting.organizers.join(', ') }}
  </p>

  <div v-if="meeting.photo" class="pb-3">
    <img
      :src="withBase(meeting.photo)"
      :alt="`Group photo of the ${meeting.year} meeting`"
      loading="lazy"
      decoding="async"
      class="lg:w-[65%] w-full mx-auto"
    >
  </div>

  <div v-for="session in meeting.sessions" :key="session.name" class="pb-4">
    <h5 class="font-serif font-medium text-xl mb-2">
      {{ session.name }}
      <span class="ml-2 opacity-70 text-sm">{{ session.room }}</span>
    </h5>
    <dl class="border-l-5 border-primary-800 grid grid-cols-[auto_1fr] gap-4 mb--2">
      <ScheduleEntry
        v-for="entry in session.schedule"
        :key="entry.at"
        :entry="entry"
      />
    </dl>
  </div>
</template>
