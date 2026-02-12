import './lib/env';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@nuxt/eslint', '@nuxtjs/supabase', '@nuxt/ui'],
    eslint: {
        config: {
            standalone: false,
        },
    },
    css: ['~/assets/main.css'],
    supabase: {
        redirectOptions: {
            login: '/account/login',
            callback: '',
            exclude: ['/account/register'],
        },
        types: false,
    },
});
