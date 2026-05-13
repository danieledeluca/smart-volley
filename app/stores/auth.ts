import type { auth } from '~~/lib/auth';

import { inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/vue';

const authClient = createAuthClient({
    plugins: [inferAdditionalFields<typeof auth>()],
});

export const useAuthStore = defineStore('auth', () => {
    const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(null);
    const isLoading = computed(() => session.value?.isPending);

    const user = computed(() => session.value?.data?.user);
    const isAdmin = computed(() => user.value?.role === 'admin');
    const isManager = computed(() => user.value?.role === 'manager');
    const isViewer = computed(() => user.value?.role === 'viewer');

    const canView = computed(() => isAdmin.value || isManager.value || isViewer.value);
    const canEdit = computed(() => isAdmin.value || isManager.value);

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
            callbackURL: '/dashboard',
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
        isLoading,
        user,
        isAdmin,
        canView,
        canEdit,
        init,
        signIn,
        signOut,
    };
});
