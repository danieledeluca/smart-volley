import { createAuthClient } from 'better-auth/vue';

const authClient = createAuthClient();

export const useAuthStore = defineStore('auth', () => {
    const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(null);
    const user = computed(() => session.value?.data?.user);
    const isLoading = computed(() => session.value?.isPending);

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

    async function signIn() {
        await authClient.signIn.social({
            provider: 'google',
            callbackURL: '/',
            errorCallbackURL: '/error',
            fetchOptions: {
                headers: getHeaders(),
            },
        });
    }

    async function signOut() {
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

    return {
        session,
        user,
        isLoading,
        init,
        signIn,
        signOut,
    };
});
