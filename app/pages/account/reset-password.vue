<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
});

useSeoMeta({
    title: 'Reset password',
});

const authStore = useAuthStore();
const { messages } = storeToRefs(authStore);
</script>

<template>
    <UPageCard class="mx-auto w-full max-w-md" variant="subtle">
        <UAuthForm
            :schema="resetPasswordSchema"
            title="Create a new password"
            icon="i-lucide-lock-keyhole"
            :fields="authStore.resetPasswordFields"
            :loadingAuto="true"
            :submit="{
                label: 'Reset password',
            }"
            @submit="authStore.resetPassword"
        >
            <template #description>
                Choose a strong password to secure your account.
            </template>
            <template #password-help>
                Must be at least 8 characters
            </template>
            <template v-if="messages.length > 0" #validation>
                <UAlert
                    v-for="message in messages"
                    :key="message.title"
                    :color="message.color"
                    :icon="message.icon"
                    :title="message.title"
                />
            </template>
        </UAuthForm>
    </UPageCard>
</template>
