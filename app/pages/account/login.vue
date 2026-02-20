<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
});

useSeoMeta({
    title: 'Login',
});

const authStore = useAuthStore();
const { messages } = storeToRefs(authStore);
</script>

<template>
    <UPageCard class="mx-auto w-full max-w-md" variant="subtle">
        <UAuthForm
            :schema="loginSchema"
            title="Sign in"
            icon="i-lucide-log-in"
            :fields="authStore.loginFields"
            :loadingAuto="true"
            :submit="{
                label: 'Login',
            }"
            @submit="authStore.login"
        >
            <template #description>
                Don't have an account?
                <ULink to="/account/register" class="font-medium text-primary">
                    Sign up
                </ULink>
            </template>
            <template #password-hint>
                <ULink to="/account/forgot-password" class="font-medium text-primary" tabindex="-1">
                    Forgot password?
                </ULink>
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
