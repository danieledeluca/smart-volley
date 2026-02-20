import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui';

export const useAuthStore = defineStore('auth', () => {
    const route = useRoute();
    const user = useSupabaseUser();
    const client = useSupabaseClient();

    const messages = ref<Message[]>([]);

    const formFields: Record<AuthFormFields, AuthFormField> = {
        email: {
            name: 'email',
            type: 'email',
            label: 'Email',
            placeholder: 'Enter your email',
            required: true,
            autocomplete: 'username',
        },
        password: {
            name: 'password',
            label: 'Password',
            type: 'password',
            placeholder: 'Enter your password',
            required: true,
            autocomplete: 'new-password',
        },
        confirmPassword: {
            name: 'confirmPassword',
            label: 'Confirm password',
            type: 'password',
            placeholder: 'Enter your confirm password',
            required: true,
            autocomplete: 'new-password',
        },
    };

    const loginFields = [formFields.email, formFields.password];
    const registerFields = [formFields.email, formFields.password, formFields.confirmPassword];
    const forgotPasswordFields = [formFields.email];
    const resetPasswordFields = [formFields.password, formFields.confirmPassword];

    async function register(event: FormSubmitEvent<RegisterSchema>) {
        messages.value = [];

        try {
            const { data: response, error } = await client.auth.signUp({
                email: event.data.email,
                password: event.data.password,
            });

            if (response.user) {
                if (response.user.identities?.length) {
                    messages.value.push({
                        title: 'We\'ve sent you a confirmation email. Please check your inbox to activate your account.',
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
                title: error.message,
                color: 'error',
                icon: 'i-lucide-circle-x',
            });
        }
    }

    async function login(event: FormSubmitEvent<LoginSchema>) {
        messages.value = [];

        try {
            const { data: response, error } = await client.auth.signInWithPassword({
                email: event.data.email,
                password: event.data.password,
            });

            if (response.user) {
                return navigateTo('/');
            }

            if (error) {
                throw error;
            }
        } catch (err) {
            const error = err as Error;

            messages.value.push({
                title: error.message,
                color: 'error',
                icon: 'i-lucide-circle-x',
            });
        }
    }

    async function logOut() {
        await client.auth.signOut();

        return navigateTo('/account/login');
    }

    async function forgotPassword(event: FormSubmitEvent<ForgotPasswordSchema>) {
        messages.value = [];

        try {
            const { error } = await client.auth.resetPasswordForEmail(event.data.email, {
                redirectTo: `${window.location.origin}/account/reset-password`,
            });

            if (error) {
                throw error;
            } else {
                messages.value.push({
                    title: 'We\'ve sent you a password reset email. Please check your inbox to continue.',
                    color: 'success',
                    icon: 'i-lucide-circle-check',
                });
            }
        } catch (err) {
            const error = err as Error;

            messages.value.push({
                title: error.message,
                color: 'error',
                icon: 'i-lucide-circle-x',
            });
        }
    }

    async function resetPassword(event: FormSubmitEvent<ResetPasswordSchema>) {
        messages.value = [];

        try {
            const { data: response, error } = await client.auth.updateUser({
                password: event.data.password,
            });

            if (response.user) {
                return navigateTo('/');
            }

            if (error) {
                throw error;
            }
        } catch (err) {
            const error = err as Error;

            messages.value.push({
                title: error.message,
                color: 'error',
                icon: 'i-lucide-circle-x',
            });
        }
    }

    effect(() => {
        if (route.name?.toString().startsWith('account')) {
            messages.value = [];
        }
    });

    return {
        user,
        client,
        messages,
        loginFields,
        registerFields,
        forgotPasswordFields,
        resetPasswordFields,
        register,
        login,
        logOut,
        forgotPassword,
        resetPassword,
    };
});
