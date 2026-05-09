import { findSeasons } from '~~/lib/db/queries/seasons';

export default defineAuthenticatedEventHandler(async () => {
    return await findSeasons();
});
