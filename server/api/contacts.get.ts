export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const seasonId = Number(query.season as string);
    const activityId = Number(query.activity as string);

    const athletes = await prisma.athlete.findMany({
        select: athleteContactsSelect,
        where: {
            seasonId,
            activityId,
        },
        orderBy: {
            name: 'asc',
        },
    });

    return athletes;
});
