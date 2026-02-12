<script setup lang="ts">
import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui';

const user = useSupabaseUser();
const client = useSupabaseClient();
const route = useRoute();

const navigationMenuItems = computed <NavigationMenuItem[]> (() => [
    {
        label: 'Anagrafica',
        to: '/anagrafica',
        icon: 'i-lucide-users',
        active: route.path === '/anagrafica',
    },
    {
        label: 'Pagamenti',
        to: '/pagamenti',
        icon: 'i-lucide-credit-card',
        active: route.path === '/pagamenti',
    },
    {
        label: 'Certificati',
        to: '/certificati',
        icon: 'i-lucide-file',
        active: route.path === '/certificati',
    },
    {
        label: 'Rubrica',
        to: '/rubrica',
        icon: 'i-lucide-notebook',
        active: route.path === '/rubrica',
    },
    {
        label: 'Email',
        to: '/email',
        icon: 'i-lucide-mail',
        active: route.path === '/email',
    },
]);

const dropdownMenuItems = ref<DropdownMenuItem[][]>([]);

if (user.value) {
    dropdownMenuItems.value.push(
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
                    await client.auth.signOut();
                    navigateTo('/', { external: true });
                },
            },
        ],
    );
} else {
    dropdownMenuItems.value.push(
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
    );
}
</script>

<template>
    <UApp>
        <UHeader title="Smart Volley" mode="drawer">
            <template #title>
                Smart Volley
            </template>

            <UNavigationMenu :items="navigationMenuItems" />

            <template #right>
                <UColorModeButton />

                <UDropdownMenu :items="dropdownMenuItems" :modal="false" :content="{ align: 'end' }">
                    <UButton
                        color="neutral"
                        variant="ghost"
                        icon="i-lucide-circle-user-round"
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
            <p class="text-muted text-sm">
                &copy; {{ new Date().getFullYear() }} - Daniele De Luca
            </p>
        </UFooter>
    </UApp>
</template>
