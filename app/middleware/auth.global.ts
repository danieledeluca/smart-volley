import { createAuthClient } from 'better-auth/vue';

export default defineNuxtRouteMiddleware(async (to) => {
    const authClient = createAuthClient();
    const session = await authClient.useSession(useFetch);

    if (DISALLOWED_PATHS.includes(to.path)) {
        if (!session.data.value) {
            return navigateTo('/', { redirectCode: 302 });
        }
    }

    if (ACCOUNT_PATHS.includes(to.path)) {
        if (session.data.value) {
            return navigateTo('/', { redirectCode: 302 });
        }
    }
});
