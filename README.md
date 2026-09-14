# KoKoKo website

Static site for the *Koralm Kombinatorik Kolloquium*, built with Nuxt and
deployed to GitHub Pages at <https://mathematik.uni-graz.at/kokoko/>.

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm check      # typecheck + full static build, same as CI
```

## Content

Everything on the site comes from `content/`, one directory per edition:

```
content/
  2025/
    meeting.yml        # date, venue, organizers, and the programme
    talks/
      wallner.md       # one file per talk; the file name is its slug
```

`meeting.yml` is the single source of truth for the programme. Talk files hold
only what is intrinsic to the talk — who speaks, and about what:

```yaml
# content/2025/meeting.yml
date: 2025-03-17
location: TU Graz
organizers:
  - Stephan Wagner
photo: /img/2025.jpeg          # optional group photo in public/img/

sessions:
  - name: Morning Session
    room: Steyrergasse 30, Room AE01
    schedule:
      - { at: "10:00", talk: sellers }     # -> content/2025/talks/sellers.md
      - { at: "10:50", talk: wallner }
      - { at: "12:00", break: Lunch Break }
```

```markdown
<!-- content/2025/talks/wallner.md -->
---
presenter: Michael Wallner
affiliation: TU Graz
title: Enumerating king walks avoiding a quadrant
---

We continue the enumeration of plane lattice walks with small steps avoiding
the negative quadrant, ...
```

The body is the abstract and is optional; talks without one simply get no
`[+]` toggle. Both the abstract and the title are Markdown and may contain
TeX between `$...$` or `$$...$$`.

### Announcing an edition that is not scheduled yet

Leave out `date`, `location` and `sessions`, and give an `announcement`:

```yaml
# content/2026/meeting.yml
announcement: |
  KoKoKo 2026 is likely to take place in Spring 2026 in Klagenfurt.
  More information will follow in due course.
```

### What the build checks

`content/` is compiled by `scripts/nuxt-content.ts` before Nuxt starts, and the
build **fails** rather than quietly dropping content when

- a `talk:` entry names a file that does not exist in `<year>/talks/`,
- a talk file is never referenced by any session,
- a talk is scheduled twice,
- a session's times are not in chronological order,
- talk frontmatter is missing a field or has an unknown one,
- a meeting has sessions but no `date`/`location`, or has neither sessions nor
  an announcement,
- `meeting.yml`'s `date` does not fall in its directory's year,
- any formula fails to parse in KaTeX.

## How it is put together

| | |
|---|---|
| `content/` | all site content, see above |
| `scripts/schema.ts` | Zod schemas for `meeting.yml` and talk frontmatter |
| `scripts/render.ts` | Markdown + TeX → HTML (remark/rehype + KaTeX) |
| `scripts/content.ts` | loads and cross-validates `content/` |
| `scripts/nuxt-content.ts` | Nuxt module exposing it as `#build/kokoko-content/meetings` |
| `shared/content.ts` | types shared between the build and the app |
| `app/` | the Nuxt app (pages, components, styles) |

Markdown and math are rendered **at build time**, so no content runtime and no
KaTeX ship to the browser — only `katex.min.css` and its fonts. The only
client-side JavaScript is Nuxt itself plus the abstract collapse animation.

## Deployment

`.github/workflows/deploy.yml` typechecks and builds on every push and pull
request; `main` is published to GitHub Pages, pull requests get a surge.sh
preview. The base URL is set through `NUXT_APP_BASE_URL` (`/kokoko/` in
production, `/` for previews and local development).
