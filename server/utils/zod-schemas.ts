import z from 'zod';

export const DetailPageRouterParamsSchema = z.object({
    id: z.coerce.number(),
});

export type DetailPageRouterParamsSchema = z.infer<typeof DetailPageRouterParamsSchema>;
