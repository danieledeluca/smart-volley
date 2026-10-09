export const useAuthStore = defineStore('auth', () => {
    const { $authUser: user, $authSession: session, $authClient, $refreshSession } = useNuxtApp();

    const isLoading = ref(false);

    const isAdmin = computed(() => user.value?.role === 'admin');
    const isManager = computed(() => user.value?.role === 'manager');
    const isViewer = computed(() => user.value?.role === 'viewer');

    const canView = computed(() => isAdmin.value || isManager.value || isViewer.value);
    const canEdit = computed(() => isAdmin.value || isManager.value);

    function getHeaders() {
        const { csrf } = useCsrf();
        const headers = new Headers();
        headers.append('csrf-token', csrf);

        return headers;
    }

    async function signIn() {
        isLoading.value = true;

        await $authClient.signIn.social({
            provider: 'google',
            callbackURL: '/dashboard',
            errorCallbackURL: '/error',
            fetchOptions: {
                headers: getHeaders(),
            },
        });
    }

    async function signOut() {
        isLoading.value = true;

        await $authClient.signOut({
            fetchOptions: {
                headers: getHeaders(),
            },
        });

        await $refreshSession();

        isLoading.value = false;

        navigateTo('/');
    }

    return {
        session,
        user,
        isLoading,
        isAdmin,
        canView,
        canEdit,
        signIn,
        signOut,
    };
});
