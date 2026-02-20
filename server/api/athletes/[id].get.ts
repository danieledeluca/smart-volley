export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id') as string;

    const athlete = await prisma.athlete.findUnique({
        include: athletesInclude,
        where: {
            id: Number(id),
        },
    });

    return athlete;
});
