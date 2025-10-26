// plugins/vuetify.ts

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // Importa los íconos
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true, // Importante para Server-Side Rendering de Nuxt
    components,
    directives,
    // Puedes agregar más configuraciones aquí, como temas, etc.
  })
  nuxtApp.vueApp.use(vuetify)
})