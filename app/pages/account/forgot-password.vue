<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui';

definePageMeta({
    middleware: 'auth',
});

useSeoMeta({
    title: 'Forgot password',
});

const client = useSupabaseClient();

const messages = ref<Message[]>([]);

async function onSubmit(event: FormSubmitEvent<ForgotPasswordSchema>) {
    messages.value = [];

    try {
        const { error } = await client.auth.resetPasswordForEmail(event.data.email, {
            redirectTo: `${window.location.origin}/account/reset-password`,
        });

        if (error) {
            throw error;
        } else {
            messages.value.push({
                description: 'Check your email to reset your password',
                color: 'success',
                icon: 'i-lucide-circle-check',
            });
        }
    } catch (err) {
        const error = err as Error;

        messages.value.push({
            description: error.message,
            color: 'error',
            icon: 'i-lucide-circle-x',
        });
    }
}

const fields: AuthFormField[] = [
    {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        required: true,
    },
];
</script>

<template>
    <UPageCard class="max-w-md w-full mx-auto" variant="subtle">
        <UAuthForm
            :schema="forgotPasswordSchema"
            title="Forgot password"
            icon="i-lucide-lock-open"
            :fields="fields"
            :loadingAuto="true"
            :submit="{
                label: 'Reset password',
            }"
            @submit="onSubmit"
        >
            <template #description>
                Enter your email to recover your password
            </template>
            <template v-if="messages.length > 0" #validation>
                <UAlert
                    v-for="message in messages"
                    :key="message.description"
                    :color="message.color"
                    :icon="message.icon"
                    :description="message.description"
                />
            </template>
        </UAuthForm>
    </UPageCard>
</template>
