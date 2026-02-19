export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id') as string;

    const athlete = await prisma.athlete.findUnique({
        include: {
            activity: true,
            course: true,
            parent: true,
            season: true,
        },
        where: {
            id: Number(id),
        },
    });

    return athlete;
});
