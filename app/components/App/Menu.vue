<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const { collapsed } = defineProps<{
    collapsed: boolean;
}>();

const route = useRoute();
const authStore = useAuthStore();

const { isAdmin, canEdit } = storeToRefs(authStore);

const isEnrollmentRoute = computed(() => {
    const enrollmentRoutes = ['dashboard-enrollments', 'dashboard-payment', 'dashboard-certificates'];

    return enrollmentRoutes.some((enrollmentRoute) => route.name?.toString()?.startsWith(enrollmentRoute));
});

const navigationMenuItems = computed(() => {
    const items: NavigationMenuItem[][] = [
        [
            {
                label: $t('menu.dashboard'),
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
                label: $t('menu.parents'),
                to: '/dashboard/parents',
                icon: 'i-lucide-users',
                active: route.path.startsWith('/dashboard/parents'),
            },
            {
                label: $t('menu.enrollments'),
                to: {
                    path: '/dashboard/enrollments',
                    query: isEnrollmentRoute.value ? { ...route.query } : undefined,
                },
                icon: 'i-lucide-list',
                active: route.path.startsWith('/dashboard/enrollments'),
                open: true,
                children: [
                    {
                        label: $t('menu.payments'),
                        to: {
                            path: '/dashboard/payments',
                            query: isEnrollmentRoute.value ? { ...route.query } : undefined,
                        },
                        icon: 'i-lucide-badge-euro',
                    },
                    {
                        label: $t('menu.certificates'),
                        to: {
                            path: '/dashboard/certificates',
                            query: isEnrollmentRoute.value ? { ...route.query } : undefined,
                        },
                        icon: 'i-lucide-briefcase-medical',
                    },
                ],
            },
        ],
    ];

    if (canEdit.value) {
        items.push(
            [
                {
                    label: $t('menu.seasons'),
                    to: '/dashboard/seasons',
                    icon: 'i-lucide-calendar',
                },
                {
                    label: $t('menu.activities'),
                    to: '/dashboard/activities',
                    icon: 'i-lucide-zap',
                },
                {
                    label: $t('menu.courses'),
                    to: '/dashboard/courses',
                    icon: 'i-lucide-dumbbell',
                },
            ],
        );
    }

    return items;
});

const adminNavigationMenuItems = computed<NavigationMenuItem[]>(() => {
    return [
        {
            label: $t('menu.settings.label'),
            to: '/dashboard/settings/users',
            icon: 'i-lucide-settings',
            active: route.path.startsWith('/dashboard/settings'),
        },
    ];
});
</script>

<template>
    <UNavigationMenu
        :items="navigationMenuItems"
        :collapsed
        orientation="vertical"
        tooltip
        popover
    />
    <UNavigationMenu
        v-if="isAdmin"
        :items="adminNavigationMenuItems"
        :collapsed
        orientation="vertical"
        tooltip
        class="mt-auto"
    />
</template>
