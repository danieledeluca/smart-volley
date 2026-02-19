<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui';

definePageMeta({
    middleware: 'auth',
});

useSeoMeta({
    title: 'Register',
});

const client = useSupabaseClient();

const messages = ref<Message[]>([]);

async function onSubmit(event: FormSubmitEvent<RegisterSchema>) {
    messages.value = [];

    try {
        const { data: response, error } = await client.auth.signUp({
            email: event.data.email,
            password: event.data.password,
        });

        if (response.user) {
            if (response.user.identities?.length) {
                messages.value.push({
                    description: 'Check your email to confirm your account',
                    color: 'success',
                    icon: 'i-lucide-circle-check',
                });
            } else {
                throw new Error('Email already used');
            }
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
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        required: true,
    },
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
    <UPageCard class="mx-auto w-full max-w-md" variant="subtle">
        <UAuthForm
            :schema="registerSchema"
            title="Register"
            icon="i-lucide-user-plus"
            description="Create a new account."
            :fields="fields"
            :loadingAuto="true"
            :submit="{
                label: 'Create account',
            }"
            @submit="onSubmit"
        >
            <template #description>
                Already have an account?
                <ULink to="/account/login" class="font-medium text-primary">
                    Login
                </ULink>
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
