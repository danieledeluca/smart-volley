<script setup lang="ts">
import type { PageCardProps } from '@nuxt/ui';

useSeoMeta({
    title: $t('page.dashboard.title'),
});

// TODO: placeholder
const cards: PageCardProps[] = [
    {
        title: 'Theme',
        description: 'Learn how to customize Nuxt UI components using Tailwind CSS.',
        icon: 'i-lucide-swatch-book',
        to: '/docs/getting-started/theme/design-system',
        class: 'lg:col-span-2',
        orientation: 'horizontal' as const,
    },
    {
        title: 'Fonts',
        description: 'Nuxt UI integrates with Nuxt Fonts to provide plug-and-play font optimization.',
        icon: 'i-lucide-a-large-small',
        to: '/docs/getting-started/integrations/fonts',
        variant: 'soft' as const,
    },
    {
        title: 'Color Mode',
        description: 'Nuxt UI integrates with Nuxt Color Mode to switch between light and dark.',
        icon: 'i-lucide-sun-moon',
        to: '/docs/getting-started/integrations/color-mode',
        variant: 'soft' as const,
    },
    {
        title: 'Icons',
        description: 'Nuxt UI integrates with Nuxt Icon to access over 200,000+ icons from Iconify.',
        icon: 'i-lucide-smile',
        to: '/docs/getting-started/integrations/icons',
        class: 'lg:col-span-2',
        orientation: 'horizontal' as const,
        reverse: true,
    },
];
</script>

<template>
    <DashboardMain :title="$t('page.dashboard.title')">
        <UPageGrid>
            <UPageCard
                v-for="(card, index) in cards"
                :key="index"
                v-bind="card"
            />
        </UPageGrid>
    </DashboardMain>
</template>
