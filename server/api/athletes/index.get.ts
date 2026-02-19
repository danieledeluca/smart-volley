export default defineEventHandler(async () => {
    const athletes = await prisma.athlete.findMany({
        select: {
            id: true,
            name: true,
        },
        orderBy: {
            name: 'asc',
        },
    });

    return athletes;
});
