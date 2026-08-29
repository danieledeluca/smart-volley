import { findAthletes } from '~~/lib/db/queries/athletes';

export default defineAuthenticatedEventHandler(async () => {
    return await findAthletes();
});
