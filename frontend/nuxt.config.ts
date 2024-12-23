// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }, // Указываем SVG как иконку
      ],
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/variables.scss" as *;',
        },
      },
    },
  },
  css: ['@/assets/css/main.scss'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
});