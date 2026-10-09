import { auth } from '~~/lib/auth';

const RESTRICTED_SECTIONS = ['parents', 'seasons', 'activities', 'courses'];
const ADMIN_ONLY_SECTIONS = ['settings'];

export default defineEventHandler(async (event) => {
    const { pathname } = getRequestURL(event);

    if (!pathname.startsWith('/dashboard')) {
        return;
    }

    const session = await auth.api.getSession({ headers: event.headers });
    const role = session?.user.role;

    if (!role) {
        return await sendRedirect(event, '/', 302);
    }

    const isRestricted = RESTRICTED_SECTIONS.some((section) => pathname.startsWith(`/dashboard/${section}`));

    if (isRestricted && role === 'viewer') {
        return await sendRedirect(event, '/dashboard', 302);
    }

    const isAdminOnly = ADMIN_ONLY_SECTIONS.some((section) => pathname.startsWith(`/dashboard/${section}`));

    if (isAdminOnly && role !== 'admin') {
        return await sendRedirect(event, '/dashboard', 302);
    }
});
