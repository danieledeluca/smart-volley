export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id') as string);

    const athlete = await prisma.athlete.findUnique({
        include: athleteItemsInclude,
        where: {
            id,
        },
    });

    return athlete;
});
