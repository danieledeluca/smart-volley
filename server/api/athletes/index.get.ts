export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const name = query.name as string;
    const seasonId = Number(query.season as string) || undefined;
    const activityId = Number(query.activity as string) || undefined;

    const athletes = await prisma.athlete.findMany({
        select: athleteListItemsSelect,
        where: {
            name: {
                contains: name,
                mode: 'insensitive',
            },
            seasonId,
            activityId,
        },
        orderBy: {
            name: 'asc',
        },
    });

    return athletes;
});
