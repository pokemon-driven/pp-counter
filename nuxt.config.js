const SITE_NAME = 'PPカウンター ソード・シールド '
const SITE_FULL = '長期戦で忘れがちなPPをしっかり管理！' + SITE_NAME + ' - pokedri.com'
const DESCRIPTION = 'PP カウンターは、長期戦で忘れがちなPPをしっかり管理。自動で保存しいつでも読み込める pokedri.com 運営のPP管理ツールです。'

export default {
  srcDir: 'src',
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: SITE_FULL,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=1024' },
      {
        hid: 'description',
        name: 'description',
        content: DESCRIPTION,
      },
      {
        name: 'description',
        hid: 'description',
        content:
          DESCRIPTION,
      },
      { property: 'og:locale', hid: 'og:locale', content: 'ja_JP' },
      { property: 'og:type', hid: 'og:type', content: 'website' },
      {
        property: 'og:title',
        hid: 'og:title',
        content: SITE_FULL,
      },
      {
        property: 'og:description',
        hid: 'og:description',
        content:
          DESCRIPTION,
      },
      {
        property: 'og:site_name',
        hid: 'og:site_name',
        content: SITE_FULL,
      },
      {
        name: 'twitter:card',
        hid: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        property: 'og:url',
        hid: 'og:url',
        content: 'https://pokedri.com/pp-counter/',
      },
      {
        property: 'og:image',
        hid: 'og:image',
        content: 'https://pokedri.com/pp-counter/opengraph.png',
      },
      {
        property: 'og:image:secure_url',
        hid: 'og:image:secure_url',
        content: 'https://pokedri.com/pp-counter/opengraph.png',
      },
      {
        name: 'twitter:description',
        hid: 'twitter:description',
        content:
          DESCRIPTION,
      },
      {
        name: 'twitter:title',
        hid: 'twitter:title',
        content: SITE_FULL,
      },
      {
        name: 'twitter:image',
        hid: 'twitter:image',
        content: 'https://pokedri.com/pp-counter/opengraph.png',
      },
    ],
    link: [
      { rel: 'canonical', href: 'https://pokedri.com/pp-counter/' },
      { rel: 'icon', type: 'image/png', href: '/pp-counter/favicon.png' }
    ],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  router: {
    base: '/pp-counter'
  },
  /*
   ** Nuxt.js modules
   */
  modules: [],
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
}
