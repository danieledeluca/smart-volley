// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@nuxt/eslint', '@nuxtjs/supabase', '@nuxt/ui', '@pinia/nuxt', '@nuxt/image'],
    eslint: {
        config: {
            standalone: false,
        },
    },
    css: ['~/assets/css/main.css'],
    supabase: {
        redirectOptions: {
            login: '/account/login',
            callback: '',
            exclude: ['/', '/account/register', '/account/forgot-password', '/account/reset-password'],
        },
        types: false,
    },
    typescript: {
        typeCheck: true,
    },
});
