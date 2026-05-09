import { findActivities } from '~~/lib/db/queries/activities';

export default defineAuthenticatedEventHandler(async () => {
    return await findActivities();
});
