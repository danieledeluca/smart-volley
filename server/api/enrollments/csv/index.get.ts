import { findEnrollmentsForExport } from '~~/lib/db/queries/enrollments';
import z from 'zod';

const QuerySchema = z.object({
    ids: z.string().transform((value) => [...new Set(value.split(',').map(Number))]),
});

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await getValidatedQuery(event, QuerySchema.safeParse);

    if (!result.success) {
        return sendZodError(event, result.error);
    }

    const enrollments = await findEnrollmentsForExport(result.data.ids);

    if (result.data.ids.length !== enrollments.length) {
        throw createError({
            statusCode: 404,
            statusMessage: $t('page.enrollment.error'),
        });
    }

    const csv = toCsv(enrollmentCsv(enrollments));
    const fileName = enrollments.length > 1 ? 'iscrizioni.csv' : `iscrizione-${enrollments?.[0]?.id}.csv`;

    setHeader(event, 'Content-Type', 'text/csv; charset=utf-8');
    setHeader(event, 'Content-Disposition', `attachment; filename="${fileName}"`);

    return csv;
}, {
    roles: ['admin', 'manager', 'viewer'],
});
