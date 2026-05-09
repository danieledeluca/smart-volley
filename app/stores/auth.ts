import type { AlertProps, AuthFormField, FormSubmitEvent } from '@nuxt/ui';

import { createAuthClient } from 'better-auth/vue';

import type { LoginSchema, RegisterSchema } from '#imports';

type AuthFormFields = 'email' | 'password' | 'confirmPassword';

const authClient = createAuthClient();

export const useAuthStore = defineStore('auth', () => {
    const route = useRoute();

    const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(null);
    const user = computed(() => session.value?.data?.user);
    const isLoading = computed(() => session.value?.isPending);

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

    async function init() {
        const data = await authClient.useSession(useFetch);
        session.value = data;
    }

    function getHeaders() {
        const { csrf } = useCsrf();
        const headers = new Headers();
        headers.append('csrf-token', csrf);

        return headers;
    }

    async function register(event: FormSubmitEvent<RegisterSchema>) {
        alerts.value = [];

        await authClient.signUp.email({
            name: event.data.email,
            email: event.data.email,
            password: event.data.password,
            image: getAvatar(event.data.email, 40).src,
            fetchOptions: {
                headers: getHeaders(),
                onSuccess: () => {
                    navigateTo('/');
                },
                onError: (ctx) => {
                    alerts.value.push({
                        title: ctx.error.statusText,
                        color: 'error',
                        icon: 'i-lucide-circle-x',
                    });
                },
            },
        });
    }

    async function login(event: FormSubmitEvent<LoginSchema>) {
        alerts.value = [];

        await authClient.signIn.email({
            email: event.data.email,
            password: event.data.password,
            rememberMe: true,
            fetchOptions: {
                headers: getHeaders(),
                onSuccess: () => {
                    navigateTo('/');
                },
                onError: (ctx) => {
                    alerts.value.push({
                        title: ctx.error.statusText,
                        color: 'error',
                        icon: 'i-lucide-circle-x',
                    });
                },
            },
        });
    }

    async function logout() {
        await authClient.signOut(
            {
                fetchOptions: {
                    headers: getHeaders(),
                    onSuccess: () => {
                        navigateTo('/');
                    },
                    onError: (ctx) => {
                        const toast = useToast();

                        toast.add({
                            title: ctx.error.statusText,
                            color: 'error',
                            icon: 'i-lucide-circle-x',
                        });
                    },
                },
            },
        );
    }

    effect(() => {
        if (route.name?.toString().startsWith('account')) {
            alerts.value = [];
        }
    });

    return {
        init,
        session,
        user,
        isLoading,
        loginFields,
        registerFields,
        register,
        login,
        logout,
        alerts,
    };
});
