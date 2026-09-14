/** Types for the content compiled at build time by `scripts/nuxt-content.ts`. */

/** A talk, with `title` and `abstract` already rendered to HTML (math included). */
export interface Talk {
  slug: string
  presenter: string
  affiliation: string
  /** Rendered HTML; inline math is already KaTeX markup. */
  title: string
  /** Rendered HTML, empty string when the talk has no abstract. */
  abstract: string
}

/** A talk in the programme, at a given time. */
export interface TalkEntry extends Talk {
  kind: 'talk'
  at: string
}

/** A non-talk programme item: coffee break, open problem discussion, ... */
export interface BreakEntry {
  kind: 'break'
  at: string
  label: string
}

export type ScheduleEntry = TalkEntry | BreakEntry

export interface Session {
  name: string
  room: string
  schedule: ScheduleEntry[]
}

export interface Meeting {
  /** Directory name, e.g. "2025". Doubles as the heading and the sort key. */
  year: string
  /** ISO date; absent for editions that are announced but not yet scheduled. */
  date?: string
  location?: string
  organizers: string[]
  photo?: string
  announcement?: string
  sessions: Session[]
}
