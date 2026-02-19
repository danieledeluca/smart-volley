export default defineEventHandler(async () => {
    const seasons = await prisma.season.findMany({
        orderBy: {
            starterYear: 'desc',
        },
    });

    return seasons;
});
