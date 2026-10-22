import type { SelectDashboardStats } from '~~/lib/db/queries/dashboard';

function getPercentageLabel(firstValue: number = 0, secondValue: number = 0) {
    if (secondValue === 0) {
        return undefined;
    }

    const percentage = `${(((firstValue / secondValue) * 100) - 100).toFixed(1)}%`;
    const difference = firstValue - secondValue;

    if (difference === 0) {
        return undefined;
    }

    return difference > 0 ? `+${percentage}` : percentage;
}

function getTotalEnrollmentsCard(stats: SelectDashboardStats): DashboardCard {
    return {
        icon: 'i-lucide-list',
        title: $t('card.dashboard.total_enrollments'),
        description: stats.totalEnrollments.toString(),
        link: {
            path: '/dashboard/enrollments',
            query: {
                activityId: stats.activityId,
            } satisfies EnrollmentsFilters,
        },
    };
}

function getTotalPaymentsCard(stats: SelectDashboardStats): DashboardCard {
    return {
        icon: 'i-lucide-badge-euro',
        iconColor: 'success',
        title: $t('card.dashboard.total_payments'),
        description: formatPrice(stats.totalPayments),
        link: {
            path: '/dashboard/payments',
            query: {
                activityId: stats.activityId,
            } satisfies EnrollmentsFilters,
        },
    };
}

function getCurrentSeasonEnrollmentsCard(stats: SelectDashboardStats, seasonId?: number): DashboardCard {
    const badgeLabel = getPercentageLabel(stats.currentEnrollments, stats.previousEnrollments);
    const badgeColorValue = badgeLabel ? Number.parseFloat(badgeLabel) : 0;

    return {
        icon: 'i-lucide-list',
        title: $t('card.dashboard.enrollments'),
        description: stats.currentEnrollments.toString(),
        badgeLabel,
        badgeColor: badgeColorValue > 0 ? 'success' : 'error',
        link: {
            path: '/dashboard/enrollments',
            query: {
                seasonId,
                activityId: stats.activityId,
            } satisfies EnrollmentsFilters,
        },
    };
}

function getCurrentSeasonPaymentsCard(stats: SelectDashboardStats, seasonId?: number): DashboardCard {
    const badgeLabel = getPercentageLabel(Number(stats.currentPayments), Number(stats.previousPayments));
    const badgeColorValue = badgeLabel ? Number.parseFloat(badgeLabel) : 0;

    return {
        icon: 'i-lucide-badge-euro',
        iconColor: 'success',
        title: $t('card.dashboard.payments'),
        description: formatPrice(stats.currentPayments),
        badgeLabel,
        badgeColor: badgeColorValue > 0 ? 'success' : 'error',
        link: {
            path: '/dashboard/payments',
            query: {
                seasonId,
                activityId: stats.activityId,
            } satisfies EnrollmentsFilters,
        },
    };
}

function getCurrentSeasonExpiringCertificateCard(stats: SelectDashboardStats, seasonId?: number): DashboardCard {
    const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    return {
        icon: 'i-lucide-briefcase-medical',
        iconColor: 'error',
        title: $t('card.dashboard.expiring_certificates'),
        description: stats.expiringCertificates.toString(),
        badgeLabel: formatDate(thirtyDaysFromNow.toISOString(), {
            dateStyle: 'medium',
        }),
        link: {
            path: '/dashboard/certificates',
            query: {
                seasonId,
                activityId: stats.activityId,
                certificateStatus: ['valid'],
            } satisfies EnrollmentsFilters,
        },
    };
}

export function getDashboardCards(stats: SelectDashboardStats, seasonId?: number) {
    return [
        getCurrentSeasonEnrollmentsCard(stats, seasonId),
        getCurrentSeasonPaymentsCard(stats, seasonId),
        getCurrentSeasonExpiringCertificateCard(stats, seasonId),
        getTotalEnrollmentsCard(stats),
        getTotalPaymentsCard(stats),
    ];
}
