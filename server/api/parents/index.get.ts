import { findParents } from '~~/lib/db/queries/parents';

export default defineAuthenticatedEventHandler(async () => {
    return await findParents();
});
