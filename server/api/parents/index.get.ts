export default defineAuthenticatedEventHandler(async () => {
    const parents = await prisma.parent.findMany({
        orderBy: {
            name: 'asc',
        },
    });

    return parents;
});
