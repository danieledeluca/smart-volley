import './lib/env';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@nuxt/eslint', '@nuxtjs/supabase'],
    eslint: {
        config: {
            standalone: false,
        },
    },
    app: {
        head: {
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.colors.min.css',
                },
            ],
        },
    },
    css: ['~/assets/main.css'],
    supabase: {
        redirectOptions: {
            login: '/account/login',
            callback: '',
        },
        types: false,
    },
});
