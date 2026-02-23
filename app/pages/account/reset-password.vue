<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
});

useSeoMeta({
    title: $t('auth.reset_password.default'),
});

const authStore = useAuthStore();
const { messages } = storeToRefs(authStore);
</script>

<template>
    <UPageCard class="mx-auto w-full max-w-md" variant="subtle">
        <UAuthForm
            :schema="resetPasswordSchema"
            :title="$t('auth.reset_password.title')"
            icon="i-lucide-lock-keyhole"
            :fields="authStore.resetPasswordFields"
            :loadingAuto="true"
            :submit="{
                label: $t('auth.reset_password.default'),
            }"
            @submit="authStore.resetPassword"
        >
            <template #description>
                {{ $t('auth.reset_password.description') }}
            </template>
            <template #password-help>
                {{ $t('form.password.error', { min: PASSWORD_MIN_LENGTH }) }}
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
