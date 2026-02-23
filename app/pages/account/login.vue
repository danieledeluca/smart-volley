<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
});

useSeoMeta({
    title: $t('auth.sing_in.default'),
});

const authStore = useAuthStore();
const { messages } = storeToRefs(authStore);
</script>

<template>
    <UPageCard class="mx-auto w-full max-w-md" variant="subtle">
        <UAuthForm
            :schema="loginSchema"
            :title="$t('auth.sing_in.default')"
            icon="i-lucide-log-in"
            :fields="authStore.loginFields"
            :loadingAuto="true"
            :submit="{
                label: $t('auth.sing_in.default'),
            }"
            @submit="authStore.login"
        >
            <template #description>
                {{ $t('auth.sing_in.description') }}
                <ULink to="/account/register" class="font-medium text-primary">
                    {{ $t('auth.sign_up.default') }}
                </ULink>
            </template>
            <template #password-hint>
                <ULink to="/account/forgot-password" class="font-medium text-primary" tabindex="-1">
                    {{ $t('auth.sing_in.password_hint') }}
                </ULink>
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
