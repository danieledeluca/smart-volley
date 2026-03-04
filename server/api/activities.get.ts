export default defineAuthenticatedEventHandler(async () => {
    const activities = await prisma.activity.findMany({
        orderBy: {
            name: 'asc',
        },
    });

    return activities;
});
