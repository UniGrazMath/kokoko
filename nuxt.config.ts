import tailwindcss from '@tailwindcss/vite'
import contentModule from './scripts/nuxt-content'
import { siteDescription, siteTitle } from './shared/site'

const baseURL = process.env.NUXT_APP_BASE_URL || '/'
if (!baseURL.startsWith('/') || !baseURL.endsWith('/') || baseURL.includes('//')) {
  throw new Error('NUXT_APP_BASE_URL must be a path with leading/trailing slashes, e.g. /kokoko/')
}

export default defineNuxtConfig({
  compatibilityDate: '2026-09-06',
  devtools: { enabled: false },
  modules: ['@nuxt/fonts', contentModule],
  css: ['~/assets/css/main.css', 'katex/dist/katex.min.css'],
  vite: { plugins: [tailwindcss()] },
  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'en' },
      title: siteTitle,
      meta: [{ name: 'description', content: siteDescription }],
    },
  },
  nitro: {
    prerender: {
      failOnError: true,
      crawlLinks: false,
      routes: ['/'],
    },
  },
})
