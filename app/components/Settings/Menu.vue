<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const route = useRoute();

const navigationMenuItems: NavigationMenuItem[][] = [
    [
        {
            label: $t('menu.settings.users'),
            icon: 'i-lucide-users',
            to: '/dashboard/settings/users',
            active: route.path === '/dashboard/settings/users',
        },
    ],
];
</script>

<template>
    <UNavigationMenu :items="navigationMenuItems" highlight class="-mx-1 flex-1" />
</template>
