export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const name = query.name as string;
    const seasonId = Number(query.season as string) || undefined;
    const activityId = Number(query.activity as string) || undefined;
    const courseId = Number(query.course as string) || undefined;

    const athletes = await prisma.enrollment.findMany({
        select: enrollmentListItemsSelect,
        where: {
            season_id: seasonId,
            activity_id: activityId,
            course_id: courseId,
            athlete: {
                name: {
                    contains: name,
                    mode: 'insensitive',
                },
            },
        },
        orderBy: {
            athlete: {
                name: 'asc',
            },
        },
    });

    return athletes;
});
