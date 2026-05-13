import './lib/env';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@pinia/nuxt', 'nuxt-csurf'],
    eslint: {
        config: {
            standalone: false,
        },
    },
    css: ['~/assets/css/main.css'],
    typescript: {
        typeCheck: true,
    },
    vite: {
        optimizeDeps: {
            include: [
                '@vue/devtools-core',
                '@vue/devtools-kit',
                'better-auth/vue',
                'zod',
                '@vueuse/core',
                '@tanstack/vue-table',
                '@internationalized/date',
                'drizzle-orm',
                'drizzle-orm/pg-core',
                'drizzle-zod',
            ],
        },
    },
    routeRules: {
        '/dashboard/**': {
            appLayout: 'dashboard',
        },
    },
});
