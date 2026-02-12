<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';

definePageMeta({
    middleware: 'auth',
});

const client = useSupabaseClient();
const toast = useToast();
const { state, onSubmit } = useAuthForm(registerSchema, register);

async function register(event: FormSubmitEvent<RegisterSchema>) {
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
}
</script>

<template>
    <UCard variant="subtle" class="max-w-xl mx-auto">
        <template #header>
            <h1 class="text-2xl">
                Register
            </h1>
        </template>

        <UForm
            :schema="registerSchema"
            :state="state"
            class="space-y-4"
            novalidate
            @submit="onSubmit"
        >
            <UFormField label="Email" name="email">
                <UInput
                    v-model="state.email"
                    class="w-full"
                    type="email"
                    placeholder="Email"
                />
            </UFormField>

            <UFormField label="Password" name="password">
                <UInput
                    v-model="state.password"
                    type="password"
                    class="w-full"
                    placeholder="Password"
                />
            </UFormField>

            <UFormField label="Confirm password" name="confirmPassword">
                <UInput
                    v-model="state.confirmPassword"
                    type="password"
                    class="w-full"
                    placeholder="Confirm password"
                />
            </UFormField>

            <UButton type="submit" :loadingAuto="true">
                Register
            </UButton>
        </UForm>

        <template #footer>
            Already have an account?
            <NuxtLink to="/account/login">
                <strong>Login</strong>
            </NuxtLink>
        </template>
    </UCard>
</template>
