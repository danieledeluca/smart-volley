export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const name = query.name as string;

    const athletes = await prisma.athlete.findMany({
        select: athleteContactsSelect,
        where: {
            name: {
                contains: name,
                mode: 'insensitive',
            },
        },
        orderBy: {
            name: 'asc',
        },
    });

    return athletes;
});
