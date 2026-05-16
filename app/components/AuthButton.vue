<script setup lang="ts">
import type { ButtonProps, DropdownMenuItem, DropdownMenuProps } from '@nuxt/ui';

const { dropdownMenu, button } = defineProps<{
    dropdownMenu?: DropdownMenuProps;
    button?: ButtonProps;
}>();

const authStore = useAuthStore();
const { user, isLoading } = storeToRefs(authStore);

const dropdownMenuItems = computed<DropdownMenuItem[]>(() => {
    return [
        {
            label: $t('auth.sign_out'),
            icon: 'i-lucide-log-out',
            color: 'error',
            async onSelect() {
                await authStore.signOut();
            },
        },
    ];
});
</script>

<template>
    <UDropdownMenu
        v-if="user"
        :items="dropdownMenuItems"
        :modal="false"
        :content="{ align: 'end' }"
        v-bind="dropdownMenu"
    >
        <UButton
            :label="user.name"
            v-bind="button"
            :avatar="user.image ? {
                src: user.image,
                alt: user.name,
                loading: 'lazy',
            } : undefined"
            :icon="!user.image ? 'i-lucide-user' : undefined"
            :loading="isLoading"
        />
    </UDropdownMenu>
    <UButton
        v-else
        :label="$t('auth.sing_in.google')"
        v-bind="button"
        icon="i-simple-icons-google"
        :loading="isLoading"
        :loadingAuto="true"
        @click="authStore.signIn()"
    />
</template>
