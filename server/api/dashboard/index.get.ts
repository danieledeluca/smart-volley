import { findDashboardStats } from '~~/lib/db/queries/dashboard';
import { findSeason, findSeasons } from '~~/lib/db/queries/seasons';
import z from 'zod';

const QuerySchema = z.object({
    seasonId: z.coerce.number().int().positive().optional(),
});

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await getValidatedQuery(event, QuerySchema.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    const season = result.data.seasonId
        ? await findSeason(result.data.seasonId)
        : (await findSeasons())[0];

    if (!season) {
        throw createError({
            statusCode: 404,
            statusMessage: $t('page.season.error'),
        });
    }

    return await findDashboardStats(season.startYear);
});
