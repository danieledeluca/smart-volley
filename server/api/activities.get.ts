export default defineEventHandler(async () => {
    const activities = await prisma.activity.findMany({
        orderBy: {
            name: 'asc',
        },
    });

    return activities;
});
