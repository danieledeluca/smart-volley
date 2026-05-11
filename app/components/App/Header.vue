<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const route = useRoute();

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const navigationMenuItems = computed<NavigationMenuItem[]>(() => {
    return [
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
    ];
});
</script>

<template>
    <UHeader mode="drawer">
        <template #title>
            <UColorModeImage light="logo-light.png" dark="logo-dark.png" class="h-10" />
        </template>

        <UNavigationMenu v-if="user" :items="navigationMenuItems" />

        <template #right>
            <UColorModeButton />

            <AuthButton :showTextOnMobile="false" />
        </template>

        <template #body>
            <UNavigationMenu
                v-if="user"
                :items="navigationMenuItems"
                orientation="vertical"
                class="-mx-2.5"
            />
        </template>
    </UHeader>
</template>
