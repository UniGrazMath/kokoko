<script setup lang="ts">
import { computed, ref } from 'vue'
import { Collapse } from 'vue-collapsed'
import type { ScheduleEntry } from '#shared/content'

const props = defineProps<{ entry: ScheduleEntry }>()

const talk = computed(() => (props.entry.kind === 'talk' ? props.entry : null))
const breakLabel = computed(() => (props.entry.kind === 'break' ? props.entry.label : null))
const expanded = ref(false)
</script>

<template>
  <dt
    class="text-white text-center self-start bg-primary-800 px-2 pb-1 pt-[5px] rounded-r-xl font-sans font-bold text-sm"
  >
    {{ entry.at }}
  </dt>
  <dd class="pt-1 -mb-2 pb-2">
    <template v-if="talk">
      <div class="mb-1">
        {{ talk.presenter }}
        <span class="text-xs ml-1">{{ talk.affiliation }}</span>
      </div>
      <em class="font-serif" v-html="talk.title" />
      <template v-if="talk.abstract">
        <button
          type="button"
          :aria-expanded="expanded"
          :aria-label="expanded ? 'Hide abstract' : 'Show abstract'"
          class="ml-3 text-primary-900 font-bold hover:text-primary-800 cursor-pointer"
          @click="expanded = !expanded"
        >
          {{ expanded ? '[-]' : '[+]' }}
        </button>
        <Collapse :when="expanded">
          <div class="mt-1 text-sm" v-html="talk.abstract" />
        </Collapse>
      </template>
    </template>
    <em v-else class="font-serif">{{ breakLabel }}</em>
  </dd>
</template>
