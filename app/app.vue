<script setup lang="ts">
import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui';

useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} | Smart Volley` : 'Smart Volley';
    },
});

const route = useRoute();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const navigationMenuItems = computed <NavigationMenuItem[]> (() => [
    {
        label: 'Anagrafica',
        to: '/athletes',
        icon: 'i-lucide-users',
        active: route.path.startsWith('/athletes'),
    },
    {
        label: 'Pagamenti',
        to: '/payments',
        icon: 'i-lucide-credit-card',
        active: route.path === '/payments',
    },
    {
        label: 'Certificati',
        to: '/certificates',
        icon: 'i-lucide-file',
        active: route.path === '/certificates',
    },
    {
        label: 'Contatti',
        to: '/contacts',
        icon: 'i-lucide-notebook',
        active: route.path === '/contacts',
    },
]);

const dropdownMenuItems = computed<DropdownMenuItem[][]>(() => {
    if (user.value) {
        return [
            [
                {
                    label: user.value.email,
                    icon: 'i-lucide-user',
                    type: 'label',
                },
            ],
            [
                {
                    label: 'Log out',
                    icon: 'i-lucide-log-out',
                    async onSelect() {
                        await authStore.logOut();
                    },
                },
            ],
        ];
    }

    return [
        [
            {
                label: 'Login',
                to: '/account/login',
                icon: 'i-lucide-log-in',
            },
            {
                label: 'Register',
                to: '/account/register',
                icon: 'i-lucide-user-plus',
            },
        ],
    ];
});
</script>

<template>
    <UApp>
        <UHeader title="Smart Volley" mode="drawer">
            <template #title>
                <UIcon name="i-lucide-volleyball" class="size-7 text-primary" />
                <span>Smart Volley</span>
            </template>

            <UNavigationMenu :items="navigationMenuItems" />

            <template #right>
                <UColorModeButton />

                <UDropdownMenu :items="dropdownMenuItems" :modal="false" :content="{ align: 'end' }">
                    <UButton
                        color="neutral"
                        variant="ghost"
                        :avatar="user ? {
                            src: `https://dummyjson.com/icon/${user.email}/40`,
                        } : undefined"
                        :icon="!user ? 'i-lucide-circle-user-round' : undefined"
                    />
                </UDropdownMenu>
            </template>

            <template #body>
                <UNavigationMenu :items="navigationMenuItems" orientation="vertical" class="-mx-2.5" />
            </template>
        </UHeader>
        <UMain class="py-8">
            <UContainer>
                <NuxtPage />
            </UContainer>
        </UMain>
        <UFooter class="border-t border-t-accented">
            <p class="text-sm text-muted">
                &copy; {{ new Date().getFullYear() }} - Daniele De Luca
            </p>
        </UFooter>
    </UApp>
</template>
