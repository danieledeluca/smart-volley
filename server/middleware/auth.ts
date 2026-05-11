import { auth } from '~~/lib/auth';

const DISALLOWED_PATHS = ['/athletes', '/enrollments', '/payments', '/certificates'];

export default defineEventHandler(async (event) => {
    const isProtected = DISALLOWED_PATHS.some((path) => event.path.startsWith(path));

    if (isProtected) {
        const session = await auth.api.getSession({ headers: event.headers });

        if (!session) {
            await sendRedirect(event, '/', 302);
        }
    }
});
