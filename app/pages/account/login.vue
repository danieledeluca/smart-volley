<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';

definePageMeta({
    middleware: 'auth',
});

const client = useSupabaseClient();
const { state, onSubmit } = useAuthForm(loginSchema, login);

async function login(event: FormSubmitEvent<LoginSchema>) {
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
}
</script>

<template>
    <UCard variant="subtle" class="max-w-xl mx-auto">
        <template #header>
            <h1 class="text-2xl">
                Login
            </h1>
        </template>

        <UForm
            :schema="loginSchema"
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

            <UButton type="submit" :loadingAuto="true">
                Login
            </UButton>
        </UForm>

        <template #footer>
            Don't have an account?
            <NuxtLink to="/account/register">
                <strong>Register</strong>
            </NuxtLink>
        </template>
    </UCard>
</template>
