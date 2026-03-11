export default defineAuthenticatedEventHandler(async (event) => {
    const query = getQuery(event);
    const name = query.name as string | undefined;
    const seasonId = Number(query.season as string | undefined) || undefined;
    const activityId = Number(query.activity as string | undefined) || undefined;
    const courseId = Number(query.course as string | undefined) || undefined;
    const payment = query.payment as string | undefined;
    const certificateStatus = query.certificateStatus as CertificateDateStatus | undefined;

    const enrollments = await prisma.enrollment.findMany({
        select: enrollmentListItemsSelect,
        where: {
            season_id: seasonId,
            activity_id: activityId,
            course_id: courseId,
            volley_account: payment === 'volley_account' ? null : undefined,
            volley_balance: payment === 'volley_balance' ? null : undefined,
            volley_balance_secondary: payment === 'volley_balance_secondary' ? null : undefined,
            first_installment: payment === 'first_installment' ? null : undefined,
            second_installment: payment === 'second_installment' ? null : undefined,
            third_installment: payment === 'third_installment' ? null : undefined,
            certificate_expiration_date: certificateStatus === 'missing'
                ? null
                : {
                        gt: certificateStatus === 'valid' ? new Date() : undefined,
                        lt: certificateStatus === 'expired' ? new Date() : undefined,
                    },
            athlete: {
                name: {
                    contains: name,
                    mode: 'insensitive',
                },
            },
        },
        orderBy: [
            {
                athlete: {
                    name: 'asc',
                },
            },
            {
                season: {
                    end_year: 'desc',
                },
            },
        ],
    });

    const updatedEnrollments = await Promise.all(
        enrollments.map(async (enrollment) => {
            const signedUrl = await getCertificateSignedUrl(
                event,
                `${enrollment.season.starter_year}-${enrollment.season.end_year}`,
                `${enrollment.id}`,
                enrollment.athlete.name,
            );

            return { ...enrollment, certificate_download_url: signedUrl ?? null };
        }),
    );

    return updatedEnrollments;
});
