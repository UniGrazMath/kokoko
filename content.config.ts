import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    meetings: defineCollection({
      source: 'meetings/data.yml',
      type: 'data',
      schema: z.object({
        meetings: z.array(z.object({
          date: z.string().date(),
          hide_date: z.optional(z.boolean()),
          organizers: z.array(z.string()),
          location: z.string(),
          announcement: z.optional(z.string()),
          photourl: z.optional(z.string()),
          sessions: z.optional(z.array(z.object({
            name: z.string(),
            room: z.string(),
            ended_by: z.string(),
            ended_at: z.string(),
          })))
        }))
      })
    }),
    talks: defineCollection({
      source: 'talks/*/**.md',
      type: 'data',
      schema: z.object({
        title: z.string(),
        presenter: z.string(),
        affiliation: z.string(),
        time: z.string(),
        session: z.string(),
        body: z.any(),
        description: z.string(),
      })
    })
  }
})

