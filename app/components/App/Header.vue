<script setup lang="ts">
import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui';

const route = useRoute();

const authStore = useAuthStore();
const { user, isLoading } = storeToRefs(authStore);

const navigationMenuItems = computed <NavigationMenuItem[]> (() => [
    {
        label: $t('menu.athletes'),
        to: '/athletes',
        icon: 'i-lucide-users',
        active: route.path.startsWith('/athletes'),
    },
    {
        label: $t('menu.enrollments'),
        to: '/enrollments',
        icon: 'i-lucide-list',
        active: route.path.startsWith('/enrollments'),
    },
    {
        label: $t('menu.payments'),
        to: '/payments',
        icon: 'i-lucide-credit-card',
        active: route.path === '/payments',
    },
    {
        label: $t('menu.certificates'),
        to: '/certificates',
        icon: 'i-lucide-briefcase-medical',
        active: route.path === '/certificates',
    },
]);

const dropdownMenuItems = computed<DropdownMenuItem[][]>(() => {
    if (user.value) {
        return [
            [
                {
                    label: user.value.name,
                    icon: 'i-lucide-user',
                    type: 'label',
                },
            ],
            [
                {
                    label: $t('auth.log_out'),
                    icon: 'i-lucide-log-out',
                    async onSelect() {
                        await authStore.logout();
                    },
                },
            ],
        ];
    }

    return [
        [
            {
                label: $t('auth.sing_in.title'),
                to: '/account/login',
                icon: 'i-lucide-log-in',
            },
            {
                label: $t('auth.sign_up.title'),
                to: '/account/register',
                icon: 'i-lucide-user-plus',
            },
        ],
    ];
});
</script>

<template>
    <UHeader title="Smart Volley" mode="drawer">
        <template #title>
            <UColorModeImage light="logo-light.png" dark="logo-dark.png" class="h-10" />
        </template>

        <UNavigationMenu :items="navigationMenuItems" />

        <template #right>
            <UColorModeButton />

            <UDropdownMenu :items="dropdownMenuItems" :modal="false" :content="{ align: 'end' }">
                <UButton
                    color="neutral"
                    variant="ghost"
                    :avatar="user && user.image ? {
                        src: user.image,
                        alt: user.name,
                        loading: 'lazy',
                    } : undefined"
                    :icon="!user ? 'i-lucide-circle-user-round' : undefined"
                    :loading="isLoading"
                />
            </UDropdownMenu>
        </template>

        <template #body>
            <UNavigationMenu :items="navigationMenuItems" orientation="vertical" class="-mx-2.5" />
        </template>
    </UHeader>
</template>
