<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
});

useSeoMeta({
    title: $t('auth.forgot_password.meta_title'),
});

const authStore = useAuthStore();
const { messages } = storeToRefs(authStore);
</script>

<template>
    <UPageCard class="mx-auto w-full max-w-md" variant="subtle">
        <UAuthForm
            :schema="forgotPasswordSchema"
            :title="$t('auth.forgot_password.title')"
            icon="i-lucide-key-round"
            :fields="authStore.forgotPasswordFields"
            :loadingAuto="true"
            :submit="{
                label: $t('auth.reset_password.default'),
            }"
            @submit="authStore.forgotPassword"
        >
            <template #description>
                {{ $t('auth.reset_password.default') }}
            </template>
            <template #validation>
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
