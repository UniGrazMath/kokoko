import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import rehypeStringify from 'rehype-stringify'

/** Markdown + TeX -> HTML, all at build time. */
const processor = unified()
  .use(remarkParse)
  .use(remarkMath)
  .use(remarkRehype)
  .use(rehypeKatex, { strict: 'error' })
  .use(rehypeStringify)

/** `rehype-katex` reports bad TeX as a vfile message and renders it in red
 *  instead of throwing; turn that into a build failure. */
export function renderMarkdown(source: string): string {
  const file = processor.processSync(source)
  if (file.messages.length) {
    const details = file.messages
      .map(message => `  - line ${message.line ?? '?'}: ${(message.cause as Error | undefined)?.message ?? message.reason}`)
      .join('\n')
    throw new Error(`invalid TeX\n${details}`)
  }
  return String(file).trim()
}

/** Same pipeline, but for single-line strings (talk titles) where the
 *  surrounding paragraph would be in the way. */
export function renderInline(source: string): string {
  const html = renderMarkdown(source)
  const unwrapped = /^<p>([\s\S]*)<\/p>$/.exec(html)
  if (!unwrapped) {
    throw new Error(`Expected a single paragraph, got: ${html}`)
  }
  return unwrapped[1]!
}
