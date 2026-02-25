export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const seasonId = Number(query.season as string);
    const activityId = Number(query.activity as string);

    const athletes = await prisma.enrollment.findMany({
        select: enrollmentCertificatesSelect,
        where: {
            season_id: seasonId,
            activity_id: activityId,
        },
        orderBy: {
            athlete: {
                name: 'asc',
            },
        },
    });

    return athletes;
});
