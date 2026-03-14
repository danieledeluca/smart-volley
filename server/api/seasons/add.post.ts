import { SeasonUncheckedCreateInputSchema } from '~~/prisma/generated/zod';
import sendPrismaError from '~~/server/utils/send-prisma-error';

export default defineAuthenticatedEventHandler(async (event) => {
    const result = await readValidatedBody(event, SeasonUncheckedCreateInputSchema.safeParse);

    if (!result.success) {
        return sendZodError(result.error);
    }

    try {
        return await prisma.season.create({ data: result.data });
    } catch (error) {
        return sendPrismaError(error as Error);
    }
});
