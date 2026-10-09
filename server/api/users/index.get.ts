import { findUsers } from '~~/lib/db/queries/auth';

export default defineAuthenticatedEventHandler(async () => {
    return findUsers();
}, {
    roles: ['admin'],
});
