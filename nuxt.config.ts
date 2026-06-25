import './lib/env';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {
        enabled: true,
    },
    modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@pinia/nuxt', 'nuxt-csurf'],
    eslint: {
        config: {
            standalone: false,
        },
    },
    css: ['~/assets/css/main.css'],
    typescript: {
        typeCheck: false,
    },
    vite: {
        optimizeDeps: {
            include: [
                '@internationalized/date',
                '@tanstack/vue-table',
                '@vue/devtools-core',
                '@vue/devtools-kit',
                '@vueuse/core',
                'better-auth/client/plugins',
                'better-auth/vue',
                'drizzle-orm',
                'drizzle-orm/pg-core',
                'drizzle-zod',
                'zod',
            ],
        },
    },
    routeRules: {
        '/dashboard/**': {
            appLayout: 'dashboard',
        },
    },
});
