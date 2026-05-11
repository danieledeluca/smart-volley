<script setup lang="ts">
import type { ButtonProps, DropdownMenuItem } from '@nuxt/ui';

const { variant = 'ghost', color = 'neutral', size = 'md', showTextOnMobile = true } = defineProps<{
    variant?: ButtonProps['variant'];
    color?: ButtonProps['color'];
    size?: ButtonProps['size'];
    showTextOnMobile?: boolean;
}>();

const authStore = useAuthStore();
const { user, isLoading } = storeToRefs(authStore);

const dropdownMenuItems = computed<DropdownMenuItem[]>(() => {
    if (user.value) {
        return [
            {
                label: user.value.name,
                icon: 'i-lucide-user',
                type: 'label',
                class: 'md:hidden',
            },
            {
                type: 'separator',
                class: 'md:hidden',
            },
            {
                label: $t('auth.sign_out'),
                icon: 'i-lucide-log-out',
                color: 'error',
                async onSelect() {
                    await authStore.signOut();
                },
            },
        ];
    }

    return [];
});
</script>

<template>
    <UDropdownMenu
        v-if="user"
        :items="dropdownMenuItems"
        :modal="false"
        :content="{ align: 'end' }"
    >
        <UButton
            :color
            :variant
            :size
            :avatar="user.image ? {
                src: user.image,
                alt: user.name,
                loading: 'lazy',
            } : undefined"
            :icon="!user.image ? 'i-lucide-user' : undefined"
            :loading="isLoading"
        >
            <span :class="{ 'max-lg:hidden': !showTextOnMobile }">{{ user.name }}</span>
        </UButton>
    </UDropdownMenu>
    <UButton
        v-else
        :color
        :variant
        :size
        icon="i-simple-icons-google"
        :loading="isLoading"
        @click="authStore.signIn()"
    >
        <span :class="{ 'max-lg:hidden': !showTextOnMobile }">{{ $t('auth.sing_in.google') }}</span>
    </UButton>
</template>
