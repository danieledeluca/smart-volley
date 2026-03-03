export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id') as string);

    const athlete = await prisma.athlete.findUnique({
        include: athleteItemsInclude,
        where: {
            id,
        },
    });

    if (!athlete) {
        throw createError({
            statusCode: 404,
            statusMessage: $t('page.athlete.error'),
        });
    }

    return athlete;
});
