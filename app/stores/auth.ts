import type { AlertProps, AuthFormField, FormSubmitEvent } from '@nuxt/ui';

type AuthFormFields = 'email' | 'password' | 'confirmPassword';

export const useAuthStore = defineStore('auth', () => {
    const route = useRoute();
    const user = useSupabaseUser();
    const client = useSupabaseClient();

    const alerts = ref<AlertProps[]>([]);

    const formFields: Record<AuthFormFields, AuthFormField> = {
        email: {
            name: 'email',
            type: 'email',
            label: $t('form.field.email.label'),
            placeholder: $t('form.field.email.placeholder'),
            required: true,
            autocomplete: 'username',
        },
        password: {
            name: 'password',
            type: 'password',
            label: $t('form.field.password.label'),
            placeholder: $t('form.field.password.placeholder'),
            required: true,
            autocomplete: 'new-password',
        },
        confirmPassword: {
            name: 'confirmPassword',
            type: 'password',
            label: $t('form.field.confirm_password.label'),
            placeholder: $t('form.field.confirm_password.placeholder'),
            required: true,
            autocomplete: 'new-password',
        },
    };

    const loginFields = [formFields.email, formFields.password];
    const registerFields = [formFields.email, formFields.password, formFields.confirmPassword];
    const forgotPasswordFields = [formFields.email];
    const resetPasswordFields = [formFields.password, formFields.confirmPassword];

    async function register(event: FormSubmitEvent<RegisterSchema>) {
        alerts.value = [];

        try {
            const { data: response, error } = await client.auth.signUp({
                email: event.data.email,
                password: event.data.password,
            });

            if (response.user) {
                if (response.user.identities?.length) {
                    alerts.value.push({
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

            alerts.value.push({
                title: error.message,
                color: 'error',
                icon: 'i-lucide-circle-x',
            });
        }
    }

    async function login(event: FormSubmitEvent<LoginSchema>) {
        alerts.value = [];

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
                throw new Error($t(`auth.sing_in.error.${error.code}`));
            }
        } catch (err) {
            const error = err as Error;

            alerts.value.push({
                title: error.message,
                color: 'error',
                icon: 'i-lucide-circle-x',
            });
        }
    }

    async function logOut() {
        await client.auth.signOut();

        return navigateTo('/');
    }

    async function forgotPassword(event: FormSubmitEvent<ForgotPasswordSchema>) {
        alerts.value = [];

        try {
            const { error } = await client.auth.resetPasswordForEmail(event.data.email, {
                redirectTo: `${window.location.origin}/account/reset-password`,
            });

            if (error) {
                throw error;
            } else {
                alerts.value.push({
                    title: $t('auth.forgot_password.success'),
                    color: 'success',
                    icon: 'i-lucide-circle-check',
                });
            }
        } catch (err) {
            const error = err as Error;

            alerts.value.push({
                title: error.message,
                color: 'error',
                icon: 'i-lucide-circle-x',
            });
        }
    }

    async function resetPassword(event: FormSubmitEvent<ResetPasswordSchema>) {
        alerts.value = [];

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

            alerts.value.push({
                title: error.message,
                color: 'error',
                icon: 'i-lucide-circle-x',
            });
        }
    }

    effect(() => {
        if (route.name?.toString().startsWith('account')) {
            alerts.value = [];
        }
    });

    return {
        user,
        client,
        alerts,
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
