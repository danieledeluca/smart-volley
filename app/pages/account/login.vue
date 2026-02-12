<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui';

definePageMeta({
    middleware: 'auth',
});

const client = useSupabaseClient();
const toast = useToast();

async function onSubmit(event: FormSubmitEvent<LoginSchema>) {
    try {
        const { data: response, error } = await client.auth.signInWithPassword({
            email: event.data.email,
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
];
</script>

<template>
    <UPageCard class="max-w-md w-full mx-auto" variant="subtle">
        <UAuthForm
            :schema="loginSchema"
            title="Login"
            description="Enter your credentials to access your account."
            icon="i-lucide-user"
            :fields="fields"
            :loadingAuto="true"
            :submit="{
                label: 'Login',
            }"
            @submit="onSubmit"
        />
        <div class="text-sm text-muted">
            Don't have an account?
            <NuxtLink to="/account/register">
                <strong>Register</strong>
            </NuxtLink>
        </div>
    </UPageCard>
</template>
