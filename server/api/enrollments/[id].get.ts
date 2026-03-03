export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id') as string);

    const enrollment = await prisma.enrollment.findUnique({
        include: enrollmentItemsInclude,
        where: {
            id,
        },
    });

    if (!enrollment) {
        throw createError({ statusCode: 404, statusMessage: 'Enrollment not found' });
    }

    const signedUrl = await getCertificateSignedUrl(
        event,
        `${enrollment.season.starter_year}-${enrollment.season.end_year}`,
        `${enrollment.id}`,
        enrollment.athlete.name,
    );

    enrollment.certificate_download_url = signedUrl;

    return enrollment;
});
