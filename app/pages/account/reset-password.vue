<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui';

definePageMeta({
    middleware: 'auth',
});

useSeoMeta({
    title: 'Reset password',
});

const client = useSupabaseClient();

const messages = ref<Message[]>([]);

async function onSubmit(event: FormSubmitEvent<ResetPasswordSchema>) {
    messages.value = [];

    try {
        const { data: response, error } = await client.auth.updateUser({
            password: event.data.password,
        });

        if (response.user) {
            navigateTo('/', { external: true });
            return;
        }

        if (error) {
            throw error;
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
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
        required: true,
    },
    {
        name: 'confirmPassword',
        label: 'Confirm password',
        type: 'password',
        placeholder: 'Enter your confirm password',
        required: true,
    },
];
</script>

<template>
    <UPageCard class="max-w-md w-full mx-auto" variant="subtle">
        <UAuthForm
            :schema="resetPasswordSchema"
            title="Reset password"
            icon="i-lucide-lock-open"
            :fields="fields"
            :loadingAuto="true"
            :submit="{
                label: 'Reset password',
            }"
            @submit="onSubmit"
        >
            <template #description>
                Enter your new password
            </template>
            <template #password-help>
                Must be at least 8 characters
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
