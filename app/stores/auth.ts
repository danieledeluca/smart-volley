import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui';

type AuthFormFields = 'email' | 'password' | 'confirmPassword';

export const useAuthStore = defineStore('auth', () => {
    const route = useRoute();
    const user = useSupabaseUser();
    const client = useSupabaseClient();

    const messages = ref<Message[]>([]);

    const formFields: Record<AuthFormFields, AuthFormField> = {
        email: {
            name: 'email',
            type: 'email',
            label: $t('form.email.label'),
            placeholder: $t('form.email.placeholder'),
            required: true,
            autocomplete: 'username',
        },
        password: {
            name: 'password',
            type: 'password',
            label: $t('form.password.label'),
            placeholder: $t('form.password.placeholder'),
            required: true,
            autocomplete: 'new-password',
        },
        confirmPassword: {
            name: 'confirmPassword',
            type: 'password',
            label: $t('form.confirm_password.label'),
            placeholder: $t('form.confirm_password.placeholder'),
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
                        title: $t('auth.sign_up.success'),
                        color: 'success',
                        icon: 'i-lucide-circle-check',
                    });
                } else {
                    throw new Error($t('auth.sign_up.error'));
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
                navigateTo('/');
                return;
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
                    title: $t('auth.forgot_password.success'),
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
                navigateTo('/');
                return;
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
