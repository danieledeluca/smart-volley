<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
});

const client = useSupabaseClient();
const { state, errors, messages, isLoading, onSubmit } = useAuthForm(registerSchema, register);

async function register(data: RegisterSchema) {
    const { data: response, error } = await client.auth.signUp({
        email: data.email,
        password: data.password,
    });

    if (response.user) {
        if (response.user.identities?.length) {
            messages.value.push({
                text: 'Check your email to confirm your account',
                type: 'success',
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
    <article>
        <h1>Register</h1>
        <form novalidate @submit.prevent="onSubmit">
            <fieldset>
                <FormField
                    id="email"
                    v-model="state.email"
                    v-model:error="errors.email"
                    label="Email"
                    type="email"
                />
                <FormField
                    id="password"
                    v-model="state.password"
                    v-model:error="errors.password"
                    label="Password"
                    type="password"
                />
                <FormField
                    id="password-confirmation"
                    v-model="state.confirmPassword"
                    v-model:error="errors.confirmPassword"
                    type="password"
                    label="Confirm password"
                />
            </fieldset>
            <FormButton :isLoading="isLoading">
                Register
            </FormButton>
        </form>
        <div>
            Already have an account?
            <NuxtLink to="/account/login">
                <strong>Login</strong>
            </NuxtLink>
        </div>
        <div v-if="messages.length" class="messages">
            <AppMessage v-for="(message, index) in messages" :key="index" :type="message.type">
                {{ message.text }}
            </AppMessage>
        </div>
    </article>
</template>

<style scoped>
.messages {
    margin-top: var(--pico-block-spacing-vertical);
}
</style>
