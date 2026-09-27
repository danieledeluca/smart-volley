import { auth } from '~~/lib/auth';

export default defineEventHandler(async (event) => {
    const paths = ['parents', 'seasons', 'activities', 'courses'];

    if (paths.some((path) => event.path.startsWith(`/dashboard/${path}`))) {
        const session = await auth.api.getSession({ headers: event.headers });

        if (!session?.user.role || session?.user.role === 'viewer') {
            await sendRedirect(event, '/dashboard', 302);
        }
    }
});
