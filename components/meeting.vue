<script setup lang="ts">
import type { MeetingsCollectionItem } from '@nuxt/content';

const props = defineProps<{
    meeting: MeetingsCollectionItem['meetings'][0]
}>();
const meeting_year = (new Date(props.meeting.date)).getUTCFullYear();
const { data: all_talks } = await useAsyncData(`talks-${meeting_year}`, () => queryCollection('talks').all())
const talks = all_talks.value?.filter(item => item.stem.startsWith(`talks/${meeting_year}`))

const sessions = props.meeting.sessions?.map(session => {
    return {
        name: session.name,
        room: session.room,
        ended_by: session.ended_by,
        ended_at: session.ended_at,
        talks: talks?.filter(talk => talk.session == session.name).sort((a, b) => a.time.localeCompare(b.time))
    }
})

</script>

<template>
    <h3 class="mb-2 font-sans font-bold text-xl inline-flex flex-wrap">
        <span class="text-4xl mr-2">
            {{ meeting_year }}
        </span>
        <div v-if="!meeting.hide_date">
            <span
                class="px-2 py-1 text-sm border-1 border-primary-800 bg-primary-800 text-white rounded-xl self-end mr-2">
                {{ meeting.date }}
            </span>
            <span class="self-end">
                {{ meeting.location }}
            </span>
        </div>
    </h3>
    <div v-if="meeting.announcement" class="flex flex-row border-3 my-2 p-4 border-primary rounded-xl bg-primary-100">
        <div class="my-auto mr-2 text-primary-700">
            <MdiIcon preserveAspectRatio="xMidYMid meet" icon="mdiBellRing" size="24"></MdiIcon>
        </div>
        <div class="flex-1 my-auto">
            {{ meeting.announcement }}
        </div>
    </div>
    <p v-if="meeting.organizers" class="pb-3 pt-0 opacity-80">
        <span v-if="meeting.organizers.length > 1">
            Organizers:
        </span>
        <span v-else>
            Organizer:
        </span>
        {{ meeting.organizers.join(", ") }}
    </p>
    <div v-if="meeting.photourl" class="pb-3">
        <NuxtImg :src="meeting.photourl" sizes="xs:100vw lg:65vw" class="lg:w-[65%] xs:w-[100%] mx-auto" />
    </div>
    <div v-for="session in sessions" class="pb-4">
        <h5 class="font-serif font-medium text-xl mb-2">
            {{ session.name }}
            <span class="ml-2 opacity-70 text-sm">{{ session.room }}</span>
        </h5>
        <dl class="border-l-5 border-primary-800 grid grid-cols-[auto_1fr] gap-4 mb--2">
            <Talk v-for="talk in session.talks" :talk="talk" />
            <template v-if="session.ended_by">
                <dt v-html="session.ended_at ? session.ended_at : 'Break'"
                    class="text-white text-center self-start bg-primary-800 px-2 pb-1 pt-[5px] rounded-r-xl font-sans font-bold text-sm">
                </dt>
                <dd class="pt-1 -mb-2 pb-2">
                    <em class="font-serif">{{ session.ended_by }}</em>
                </dd>
            </template>
        </dl>
    </div>
</template>