// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxt/fonts', '@nuxt/icon', 'nuxt-mdi'],
  css: ['~/assets/css/main.css', '~/node_modules/katex/dist/katex.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ]
  },
  content: {
    build: {
      markdown: {
        remarkPlugins: {'remark-math': {}},
        rehypePlugins: {'rehype-katex': {}},
      }
    }
  },
  ssr: false,
  app: {
    baseURL: '/kokoko',
    head: {
      title: 'KoKoKo – Koralm Kombinatorik Kolloquium',
      meta: [
        { name: 'description',
          content: 'The Koralm Kombinatorik Kolloquium is an annual workshop on enumerative and analytic combinatorics usually held on either side of the Koralm in Austria.'
        }
      ]
    }
  },
  experimental: {
    appManifest: false,
  },
  runtimeConfig: {
    public: {
      siteTitle: 'KoKoKo – Koralm Kombinatorik Kolloquium',
    }
  }
})