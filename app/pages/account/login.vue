<script setup lang="ts">
const client = useSupabaseClient();

const errorMessage = ref('');
const successMessage = ref('');
const isLoading = ref(false);
const formState = ref<'in' | 'up'>('in');

const userState = reactive<Partial<UserSchema>>({
    email: undefined,
    password: undefined,
});

const userErrors = reactive<Partial<UserSchema>>({
    email: undefined,
    password: undefined,
});

async function signIn() {
    errorMessage.value = '';
    successMessage.value = '';

    const result = userSchema.safeParse(userState);

    if (result.success) {
        try {
            isLoading.value = true;

            const { data, error } = await client.auth[formState.value === 'in' ? 'signInWithPassword' : 'signUp']({
                email: userState.email!,
                password: userState.password!,
            });

            isLoading.value = false;

            if (data.user) {
                if (formState.value === 'in') {
                    return navigateTo('/');
                }

                if (data.user.identities?.length) {
                    successMessage.value = 'Check your email to confirm your account';
                } else {
                    throw new Error('Email already used');
                }
            }

            if (error) {
                throw error;
            }
        } catch (err) {
            const error = err as Error;
            errorMessage.value = error.message;
        }
    } else {
        result.error.issues.forEach((issue) => {
            userErrors[issue.path[0] as keyof typeof userErrors] = issue.message;
        });
    }
}

watch(() => userState.email, () => userErrors.email = undefined);
watch(() => userState.password, () => userErrors.password = undefined);
</script>

<template>
    <article>
        <form novalidate @submit.prevent="signIn">
            <fieldset>
                <label for="email">
                    Email
                    <input
                        id="email"
                        v-model="userState.email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        :aria-invalid="userErrors.email ? 'true' : undefined"
                    >
                    <small v-if="userErrors.email">{{ userErrors.email }}</small>
                </label>
                <label for="password">
                    Password
                    <input
                        id="password"
                        v-model="userState.password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        :aria-invalid="userErrors.password ? 'true' : undefined"
                    >
                    <small v-if="userErrors.password">{{ userErrors.password }}</small>
                </label>
            </fieldset>
            <button type="submit" :aria-busy="isLoading ? 'true' : undefined" :disabled="isLoading">
                <template v-if="isLoading">
                    Please wait...
                </template>
                <template v-else>
                    <template v-if="formState === 'in'">
                        Sign in
                    </template>
                    <template v-else>
                        Sign up
                    </template>
                </template>
            </button>
        </form>
        <div v-if="formState === 'up'">
            Already have an account?
            <a href="#" @click.prevent="formState = 'in'"><strong>Login</strong></a>
        </div>
        <div v-else>
            Don't have an account?
            <a href="#" @click.prevent="formState = 'up'"><strong>Register</strong></a>
        </div>
        <div class="messages">
            <AppMessage v-if="errorMessage" type="error">
                {{ errorMessage }}
            </AppMessage>
            <AppMessage v-if="successMessage" type="success">
                {{ successMessage }}
            </AppMessage>
        </div>
    </article>
</template>

<style scoped>
.messages:has(.message) {
    margin-top: var(--pico-block-spacing-vertical);
}
</style>
