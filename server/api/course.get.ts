export default defineAuthenticatedEventHandler(async () => {
    const activities = await prisma.course.findMany({
        orderBy: {
            name: 'asc',
        },
    });

    return activities;
});
