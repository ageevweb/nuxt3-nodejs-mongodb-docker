

export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      script: [{ children: `window.env = { API_BASE_URL: "${process.env.API_BASE_URL}" }`,}],
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: { additionalData: '@use "@/assets/css/variables.scss" as *;' },
      },
    },
  },
  css: ['@/assets/css/main.scss'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
});