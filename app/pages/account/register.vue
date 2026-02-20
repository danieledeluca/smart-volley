<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
});

useSeoMeta({
    title: 'Register',
});

const authStore = useAuthStore();
const { messages } = storeToRefs(authStore);
</script>

<template>
    <UPageCard class="mx-auto w-full max-w-md" variant="subtle">
        <UAuthForm
            :schema="registerSchema"
            title="Sign up"
            icon="i-lucide-user-plus"
            description="Create a new account."
            :fields="authStore.registerFields"
            :loadingAuto="true"
            :submit="{
                label: 'Create account',
            }"
            @submit="authStore.register"
        >
            <template #description>
                Already have an account?
                <ULink to="/account/login" class="font-medium text-primary">
                    Sign in
                </ULink>
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
