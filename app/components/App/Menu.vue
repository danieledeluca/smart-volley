<script setup lang="ts">
import type { NavigationMenuItem, NavigationMenuProps } from '@nuxt/ui';

const navigationMenuProps = defineProps<Omit<NavigationMenuProps, 'items'>>();

const route = useRoute();
const authStore = useAuthStore();

const { canEdit } = storeToRefs(authStore);

const navigationMenuItems = computed(() => {
    const items: NavigationMenuItem[][] = [
        [
            {
                label: $t('menu.dashboard'),
                to: '/dashboard',
                icon: 'i-lucide-layout-dashboard',
                active: route.path === '/dashboard',
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
                open: true,
                children: [
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
                ],
            },
        ],
    ];

    if (canEdit.value) {
        items.push(
            [
                {
                    label: $t('menu.parents'),
                    to: '/dashboard/parents',
                    icon: 'i-lucide-users',
                    active: route.path === '/dashboard/parents',
                },
            ],
        );
    }

    return items;
});
</script>

<template>
    <UNavigationMenu v-bind="navigationMenuProps" :items="navigationMenuItems" />
</template>
