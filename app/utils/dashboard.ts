import type { DashboardStats } from '~~/lib/db/queries/dashboard';

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

function getTotalEnrollmentsCard(stats: DashboardStats): DashboardCard {
    return {
        icon: 'i-lucide-list',
        title: $t('card.dashboard.total_enrollments'),
        description: stats.totalEnrollments.toString(),
    };
}

function getTotalPaymentsCard(stats: DashboardStats): DashboardCard {
    return {
        icon: 'i-lucide-badge-euro',
        iconColor: 'success',
        title: $t('card.dashboard.total_payments'),
        description: formatPrice(stats.totalPayments),
    };
}

function getCurrentSeasonEnrollmentsCard(stats: DashboardStats): DashboardCard {
    const badgeLabel = getPercentageLabel(stats.currentEnrollments, stats.previousEnrollments);
    const badgeColorValue = badgeLabel ? Number.parseFloat(badgeLabel) : 0;

    return {
        icon: 'i-lucide-list',
        title: $t('card.dashboard.enrollments'),
        description: stats.currentEnrollments.toString(),
        badgeLabel,
        badgeColor: badgeColorValue > 0 ? 'success' : 'error',
    };
}

function getCurrentSeasonPaymentsCard(stats: DashboardStats): DashboardCard {
    const badgeLabel = getPercentageLabel(Number(stats.currentPayments), Number(stats.previousPayments));
    const badgeColorValue = badgeLabel ? Number.parseFloat(badgeLabel) : 0;

    return {
        icon: 'i-lucide-badge-euro',
        iconColor: 'success',
        title: $t('card.dashboard.payments'),
        description: formatPrice(stats.currentPayments),
        badgeLabel,
        badgeColor: badgeColorValue > 0 ? 'success' : 'error',
    };
}

function getCurrentSeasonExpiringCertificateCard(stats: DashboardStats): DashboardCard {
    const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    return {
        icon: 'i-lucide-briefcase-medical',
        iconColor: 'error',
        title: $t('card.dashboard.expiring_certificates'),
        description: stats.expiringCertificates.toString(),
        badgeLabel: formatDate(thirtyDaysFromNow.toString(), {
            dateStyle: 'medium',
        }),
    };
}

export function getDashboardCards(stats: DashboardStats) {
    return [
        getCurrentSeasonEnrollmentsCard(stats),
        getCurrentSeasonPaymentsCard(stats),
        getCurrentSeasonExpiringCertificateCard(stats),
        getTotalEnrollmentsCard(stats),
        getTotalPaymentsCard(stats),
    ];
}
