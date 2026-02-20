<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
});

useSeoMeta({
    title: 'Forgot password',
});

const authStore = useAuthStore();
const { messages } = storeToRefs(authStore);
</script>

<template>
    <UPageCard class="mx-auto w-full max-w-md" variant="subtle">
        <UAuthForm
            :schema="forgotPasswordSchema"
            title="Forgot your password?"
            icon="i-lucide-key-round"
            :fields="authStore.forgotPasswordFields"
            :loadingAuto="true"
            :submit="{
                label: 'Reset password',
            }"
            @submit="authStore.forgotPassword"
        >
            <template #description>
                Enter your email and we'll send you a recovery link.
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
