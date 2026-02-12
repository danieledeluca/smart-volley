<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui';

definePageMeta({
    middleware: 'auth',
});

const client = useSupabaseClient();
const toast = useToast();

async function onSubmit(event: FormSubmitEvent<RegisterSchema>) {
    try {
        const { data: response, error } = await client.auth.signUp({
            email: event.data.email,
            password: event.data.password,
        });

        if (response.user) {
            if (response.user.identities?.length) {
                toast.add({
                    title: 'Check your email to confirm your account',
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

        toast.add({
            title: error.message,
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
    <UPageCard class="max-w-md w-full mx-auto" variant="subtle">
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
        />
        <div class="text-sm text-muted">
            Already have an account?
            <NuxtLink to="/account/login">
                <strong>Login</strong>
            </NuxtLink>
        </div>
    </UPageCard>
</template>
