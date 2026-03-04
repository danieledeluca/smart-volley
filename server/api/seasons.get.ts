export default defineAuthenticatedEventHandler(async () => {
    const seasons = await prisma.season.findMany({
        orderBy: {
            starter_year: 'desc',
        },
    });

    return seasons;
});
