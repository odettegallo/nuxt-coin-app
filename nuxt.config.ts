// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, {transformAssetUrls} from "vite-plugin-vuetify"
import {defineNuxtConfig} from "nuxt/config"

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: { 
      title: 'Coin App',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/coin.png' },
      ]}
  },
  plugins: ['./plugins/vuetify'],
  experimental: {
    appManifest: false,
  },
  css: ['vuetify/styles', '@/assets/main.css'],
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(
          vuetify({
            autoImport: true,
          })
        )
      })
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
