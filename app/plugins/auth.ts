import type { auth } from '~~/lib/auth';

import { inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/vue';

export default defineNuxtPlugin(async () => {
    const authClient = createAuthClient({
        baseURL: useRequestURL().origin,
        plugins: [
            inferAdditionalFields<typeof auth>(),
        ],
    });

    type Session = typeof authClient.$Infer.Session;

    const session = useState<Session['session'] | null>('auth-session', () => null);
    const user = useState<Session['user'] | null>('auth-user', () => null);

    const handleSessionError = <T extends { message?: string }>(error: T) => {
        const toast = useToast();

        if (import.meta.client) {
            toast.add({
                description: error.message || 'Session error',
                color: 'error',
                icon: 'i-lucide-circle-x',
            });
        }

        session.value = null;
        user.value = null;
    };

    const getSessionHeaders = () => {
        if (import.meta.server) {
            return useRequestHeaders(['cookie']);
        }

        return undefined;
    };

    const refreshSession = async () => {
        try {
            const { data, error } = await authClient.getSession({
                fetchOptions: {
                    headers: getSessionHeaders(),
                },
            });

            if (error) {
                handleSessionError(error);
                return;
            }

            session.value = data?.session ?? null;
            user.value = data?.user ?? null;
        } catch (error) {
            handleSessionError(error as Error);
        }
    };

    if (import.meta.server) {
        await refreshSession();
    }

    return {
        provide: {
            authSession: session,
            authUser: user,
            authClient,
            refreshSession,
        },
    };
});
