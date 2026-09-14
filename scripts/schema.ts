import { z } from 'zod'

const time = z.string().regex(/^\d{2}:\d{2}$/, 'expected a HH:MM time')

/** One line of the programme: either a talk reference or a break. */
export const scheduleEntrySchema = z.union([
  z.object({ at: time, talk: z.string().min(1) }).strict(),
  z.object({ at: time, break: z.string().min(1) }).strict(),
])

export const sessionSchema = z.object({
  name: z.string().min(1),
  room: z.string().min(1),
  schedule: z.array(scheduleEntrySchema).min(1),
}).strict()

export const meetingSchema = z.object({
  date: z.iso.date().optional(),
  location: z.string().min(1).optional(),
  organizers: z.array(z.string().min(1)).default([]),
  photo: z.string().startsWith('/').optional(),
  announcement: z.string().min(1).optional(),
  sessions: z.array(sessionSchema).default([]),
}).strict()

/** Talk frontmatter holds only what is intrinsic to the talk; time and
 *  session placement live in the meeting's schedule. */
export const talkSchema = z.object({
  presenter: z.string().min(1),
  affiliation: z.string().min(1),
  title: z.string().min(1),
}).strict()

export type MeetingSource = z.infer<typeof meetingSchema>
export type TalkSource = z.infer<typeof talkSchema>
