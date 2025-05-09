<script setup lang="ts">
import type { TalksCollectionItem } from '@nuxt/content';
import { ref } from 'vue';

defineProps<{
    talk: TalksCollectionItem
}>();
const expanded = ref(false);
</script>

<template>
    <dt
        class="text-white text-center self-start bg-primary-800 px-2 pb-1 pt-[5px] rounded-r-xl font-sans font-bold text-sm">
        {{ talk.time }}</dt>
    <dd class="pt-1 -mb-2 pb-2" x-data="{ abstract_expanded: false }">
        <div v-if="talk.presenter" class="mb-1">
            <span class="">{{ talk.presenter }}</span>
            <span class="text-xs ml-1">{{ talk.affiliation }}</span>
        </div>
        <em class="font-serif">{{ talk.title }}</em>
        <template v-if="talk.description">
            <button @click="expanded = !expanded"
                class="ml-3 text-primary-900 font-bold hover:text-primary-800 cursor-pointer">
                <span v-if="!expanded">[+]</span>
                <span v-else>[-]</span>
            </button>
            <div class="mt-1 text-sm" v-show="expanded">
                <ContentRenderer :value="talk" />
            </div>
        </template>
    </dd>
</template>