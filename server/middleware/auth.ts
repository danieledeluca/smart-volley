import { auth } from '~~/lib/auth';

export default defineEventHandler(async (event) => {
    const session = await auth.api.getSession({ headers: event.headers });

    if (DISALLOWED_PATHS.includes(event.path)) {
        if (!session) {
            await sendRedirect(event, '/', 302);
        }
    }
});
