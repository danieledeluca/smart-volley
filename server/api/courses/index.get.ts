export default defineAuthenticatedEventHandler(async () => {
    const courses = await prisma.course.findMany({
        orderBy: {
            name: 'asc',
        },
    });

    return courses;
});
