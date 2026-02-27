export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id') as string);

    const athlete = await prisma.enrollment.findUnique({
        include: enrollmentItemsInclude,
        where: {
            id,
        },
    });

    return athlete;
});
