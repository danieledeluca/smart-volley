export default defineAuthenticatedEventHandler(async () => {
    const activities = await prisma.parent.findMany({
        orderBy: {
            name: 'asc',
        },
    });

    return activities;
});
