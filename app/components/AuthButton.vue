<script setup lang="ts">
import type { ButtonProps, DropdownMenuItem, DropdownMenuProps, UserProps } from '@nuxt/ui';

const { dropdownMenuProps, buttonProps, userProps } = defineProps<{
    dropdownMenuProps?: Omit<DropdownMenuProps, 'items' | 'modal'>;
    buttonProps?: Omit<ButtonProps, 'label' | 'icon' | 'loading'>;
    userProps?: Omit<UserProps, 'name' | 'description' | 'avatar'>;
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
        v-bind="dropdownMenuProps"
        :items="dropdownMenuItems"
        :modal="false"
        :content="{ align: 'end' }"
    >
        <UButton v-bind="buttonProps" :disabled="isLoading">
            <UUser
                v-bind="userProps"
                :name="user.name"
                :description="user.role ? $t(`auth.role.${user.role.toString()}`) : $t('auth.role.waiting')"
                :avatar="{
                    src: user.image && !isLoading ? user.image : undefined,
                    alt: user.name,
                    loading: user.image && !isLoading ? 'lazy' : undefined,
                    icon: isLoading ? 'i-lucide-loader-circle' : undefined,
                    ui: {
                        icon: 'animate-spin',
                    },
                }"
                class="w-full max-w-full text-start **:data-[slot=wrapper]:max-w-[calc(100%-32px-8px)] **:data-[slot=wrapper]:*:truncate"
            />
        </UButton>
    </UDropdownMenu>
    <UButton
        v-else
        v-bind="buttonProps"
        :label="$t('auth.sing_in.google')"
        icon="i-logos-google-icon"
        :loading="isLoading"
        @click="authStore.signIn()"
    />
</template>
