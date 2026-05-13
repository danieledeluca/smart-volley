<script setup lang="ts">
import type { NavigationMenuItem, NavigationMenuProps } from '@nuxt/ui';

const props = defineProps<Omit<NavigationMenuProps, 'items'>>();

const route = useRoute();

const navigationMenuItems = computed<NavigationMenuItem[]>(() => {
    return [
        {
            label: 'Dashboard',
            to: '/dashboard',
            icon: 'i-lucide-layout-dashboard',
        },
        {
            label: $t('menu.athletes'),
            to: '/dashboard/athletes',
            icon: 'i-lucide-users',
            active: route.path.startsWith('/dashboard/athletes'),
        },
        {
            label: $t('menu.enrollments'),
            to: '/dashboard/enrollments',
            icon: 'i-lucide-list',
            active: route.path.startsWith('/dashboard/enrollments'),
        },
        {
            label: $t('menu.payments'),
            to: '/dashboard/payments',
            icon: 'i-lucide-credit-card',
            active: route.path === '/dashboard/payments',
        },
        {
            label: $t('menu.certificates'),
            to: '/dashboard/certificates',
            icon: 'i-lucide-briefcase-medical',
            active: route.path === '/dashboard/certificates',
        },
    ];
});
</script>

<template>
    <UNavigationMenu :items="navigationMenuItems" v-bind="props" />
</template>
