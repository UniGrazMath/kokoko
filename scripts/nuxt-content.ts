import { addTemplate, defineNuxtModule } from '@nuxt/kit'
import { loadMeetings } from './content'

/** Compiles `content/` into a typed module at build time, so that neither a
 *  content runtime nor KaTeX ever reaches the browser. */
export default defineNuxtModule({
  meta: { name: 'kokoko-content' },
  async setup(_options, nuxt) {
    const meetings = await loadMeetings(nuxt.options.rootDir)

    addTemplate({
      filename: 'kokoko-content/meetings.ts',
      write: true,
      getContents: () => [
        `import type { Meeting } from '#shared/content'`,
        `const meetings: Meeting[] = ${JSON.stringify(meetings)}`,
        `export default meetings`,
        '',
      ].join('\n'),
    })

    // Watch paths are relative to srcDir (app/). The string adds `content/` to
    // the watcher, the regex asks Nuxt to restart when something below changes.
    nuxt.options.watch.push('../content', /^\.\.\/content(?:\/|$)/)
  },
})
