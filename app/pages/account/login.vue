<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui';

definePageMeta({
    middleware: 'auth',
});

const client = useSupabaseClient();

const messages = ref<Message[]>([]);

async function onSubmit(event: FormSubmitEvent<LoginSchema>) {
    messages.value = [];

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
];
</script>

<template>
    <UPageCard class="max-w-md w-full mx-auto" variant="subtle">
        <UAuthForm
            :schema="loginSchema"
            title="Login"
            icon="i-lucide-user"
            :fields="fields"
            :loadingAuto="true"
            :submit="{
                label: 'Login',
            }"
            @submit="onSubmit"
        >
            <template #description>
                Don't have an account?
                <ULink to="/account/register" class="text-primary font-medium">
                    Register
                </ULink>
            </template>
            <template #password-hint>
                <ULink to="/account/forgot-password" class="text-primary font-medium" tabindex="-1">
                    Forgot password?
                </ULink>
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
