import { UserRoleSchema } from '~~/lib/db/schema';
import z from 'zod';

export const DetailPageRouterParamsSchema = z.object({
    id: z.coerce.number(),
});

export const UpdateUserRoleSchema = z.object({
    role: UserRoleSchema,
});
