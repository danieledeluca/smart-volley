import { findParents } from '~~/lib/db/queries/parents';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await getValidatedQuery(event, ParentsFiltersSchema.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    return await findParents(result.data.name);
});
