import { findAthletes } from '~~/lib/db/queries/athletes';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await getValidatedQuery(event, AthletesFiltersSchema.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    return await findAthletes(result.data.name);
});
