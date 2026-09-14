import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import matter from 'gray-matter'
import { parse as parseYaml } from 'yaml'
import type { Meeting, ScheduleEntry, Talk } from '../shared/content'
import { meetingSchema, talkSchema } from './schema'
import { renderInline, renderMarkdown } from './render'

/** Content lives in `content/<year>/`, one directory per edition. */
const YEAR = /^\d{4}$/

function fail(where: string, message: string): never {
  throw new Error(`[content] ${where}: ${message}`)
}

async function loadTalks(dir: string, year: string): Promise<Map<string, Talk>> {
  const talksDir = join(dir, 'talks')
  const files = await readdir(talksDir).catch(() => [])
  const talks = new Map<string, Talk>()

  for (const file of files.filter(name => name.endsWith('.md')).sort()) {
    const where = `${year}/talks/${file}`
    const slug = file.slice(0, -'.md'.length)
    const { data, content } = matter(await readFile(join(talksDir, file), 'utf8'))

    const parsed = talkSchema.safeParse(data)
    if (!parsed.success) {
      fail(where, `invalid frontmatter\n${z(parsed.error)}`)
    }

    talks.set(slug, {
      slug,
      presenter: parsed.data.presenter,
      affiliation: parsed.data.affiliation,
      title: renderInline(parsed.data.title),
      abstract: content.trim() ? renderMarkdown(content) : '',
    })
  }

  return talks
}

async function loadMeeting(dir: string, year: string): Promise<Meeting> {
  const source = await readFile(join(dir, 'meeting.yml'), 'utf8').catch(() => {
    fail(year, 'missing meeting.yml')
  })

  const parsed = meetingSchema.safeParse(parseYaml(source))
  if (!parsed.success) {
    fail(`${year}/meeting.yml`, `invalid\n${z(parsed.error)}`)
  }
  const meeting = parsed.data

  if (!meeting.sessions.length && !meeting.announcement) {
    fail(`${year}/meeting.yml`, 'needs either `sessions` or an `announcement`')
  }
  if (meeting.sessions.length && !(meeting.date && meeting.location)) {
    fail(`${year}/meeting.yml`, 'a meeting with sessions needs a `date` and a `location`')
  }
  if (meeting.date && !meeting.date.startsWith(year)) {
    fail(`${year}/meeting.yml`, `date ${meeting.date} does not fall in ${year}`)
  }

  const talks = await loadTalks(dir, year)
  const referenced = new Set<string>()

  const sessions = meeting.sessions.map((session) => {
    const where = `${year}/meeting.yml (${session.name})`
    let previous = ''

    const schedule = session.schedule.map((entry): ScheduleEntry => {
      if (entry.at <= previous) {
        fail(where, `schedule is not in chronological order at ${entry.at}`)
      }
      previous = entry.at

      if ('break' in entry) {
        return { kind: 'break', at: entry.at, label: entry.break }
      }

      const talk = talks.get(entry.talk)
      if (!talk) {
        const known = [...talks.keys()].join(', ') || 'none'
        fail(where, `no talk "${entry.talk}" in ${year}/talks/ (available: ${known})`)
      }
      if (referenced.has(entry.talk)) {
        fail(where, `talk "${entry.talk}" is scheduled more than once`)
      }
      referenced.add(entry.talk)

      return { kind: 'talk', at: entry.at, ...talk }
    })

    return { name: session.name, room: session.room, schedule }
  })

  const orphans = [...talks.keys()].filter(slug => !referenced.has(slug))
  if (orphans.length) {
    fail(year, `talk(s) not referenced by any session: ${orphans.join(', ')}`)
  }

  return { year, ...meeting, sessions }
}

/** All editions, newest first. Throws on any inconsistency so that a broken
 *  reference fails the build instead of silently dropping a talk. */
export async function loadMeetings(rootDir: string): Promise<Meeting[]> {
  const contentDir = join(rootDir, 'content')
  const entries = await readdir(contentDir, { withFileTypes: true })
  const years = entries
    .filter(entry => entry.isDirectory() && YEAR.test(entry.name))
    .map(entry => entry.name)
    .sort()
    .reverse()

  if (!years.length) fail('content', 'no <year>/ directories found')

  return Promise.all(years.map(year => loadMeeting(join(contentDir, year), year)))
}

function z(error: { issues: { path: PropertyKey[], message: string }[] }): string {
  return error.issues.map(issue => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`).join('\n')
}
