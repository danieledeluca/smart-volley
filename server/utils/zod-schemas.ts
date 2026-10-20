import { UserRoleSchema } from '~~/lib/db/schema';
import z from 'zod';

export const DetailPageRouterParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
});

export const MultipleDeleteSchema = z.object({
    ids: z.array(z.coerce.number().int().positive()),
});

export const UpdateUserRoleSchema = z.object({
    role: UserRoleSchema,
});
