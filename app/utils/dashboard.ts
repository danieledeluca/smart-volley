import type { ActivityKeys, SelectEnrollmentsWithRelations, SelectSeasons } from '~~/lib/db/schema';

import { ENROLLMENT_PAYMENT_FIELDS } from '~~/lib/utils/constants';

const ACTIVITY_ICONS: Record<ActivityKeys[number], string> = {
    volley: 'i-lucide-volleyball',
    gymnastics: 'i-lucide-dumbbell',
};

const DEFAULT_ACTIVITY_ICON = 'i-lucide-zap';

function getCurrentSeasonEnrollments(enrollments: SelectEnrollmentsWithRelations[], season: SelectSeasons) {
    return enrollments.filter((enrollment) => enrollment.season.startYear === season.startYear);
}

function getLastSeasonEnrollments(enrollments: SelectEnrollmentsWithRelations[], season: SelectSeasons) {
    return enrollments.filter((enrollment) => enrollment.season.endYear === season.startYear);
}

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

function getTotalPayments(enrollments: SelectEnrollmentsWithRelations[]) {
    return enrollments.reduce((acc, enrollment) => {
        const totalPayments = ENROLLMENT_PAYMENT_FIELDS.reduce((sum, field) => {
            return sum + (Number(enrollment[field] ?? 0));
        }, 0);

        return acc + totalPayments;
    }, 0);
}

function getTotalEnrollmentsCard(enrollments: SelectEnrollmentsWithRelations[], season: SelectSeasons): DashboardCard {
    const currentSeasonEnrollments = getCurrentSeasonEnrollments(enrollments, season);
    const lastSeasonEnrollments = getLastSeasonEnrollments(enrollments, season);

    const badgeLabel = getPercentageLabel(currentSeasonEnrollments.length, lastSeasonEnrollments.length);
    const badgeColorValue = badgeLabel ? Number.parseFloat(badgeLabel) : 0;

    return {
        icon: 'i-lucide-list',
        title: $t('card.dashboard.total_enrollments'),
        description: enrollments.length.toString(),
        badgeLabel,
        badgeColor: badgeColorValue > 0 ? 'success' : 'error',
    };
}

function getTotalPaymentsCard(enrollments: SelectEnrollmentsWithRelations[], season: SelectSeasons): DashboardCard {
    const currentSeasonEnrollments = getCurrentSeasonEnrollments(enrollments, season);
    const lastSeasonEnrollments = getLastSeasonEnrollments(enrollments, season);

    const totalPayments = getTotalPayments(enrollments);
    const currentSeasonPayments = getTotalPayments(currentSeasonEnrollments);
    const lastSeasonPayments = getTotalPayments(lastSeasonEnrollments);

    const badgeLabel = getPercentageLabel(currentSeasonPayments, lastSeasonPayments);
    const badgeColorValue = badgeLabel ? Number.parseFloat(badgeLabel) : 0;

    return {
        icon: 'i-lucide-badge-euro',
        iconColor: 'success',
        title: $t('card.dashboard.total_payments'),
        description: formatPrice(totalPayments.toString()),
        badgeLabel,
        badgeColor: badgeColorValue > 0 ? 'success' : 'error',
    };
}

function getCurrentSeasonEnrollmentsCard(
    enrollments: SelectEnrollmentsWithRelations[],
    season: SelectSeasons,
): DashboardCard {
    const currentSeasonEnrollments = getCurrentSeasonEnrollments(enrollments, season);

    return {
        icon: 'i-lucide-list',
        title: $t('card.dashboard.enrollments'),
        description: currentSeasonEnrollments.length.toString(),
        badgeLabel: `${season.startYear}/${season.endYear}`,
    };
}

function getCurrentSeasonMissingPayments(
    enrollments: SelectEnrollmentsWithRelations[],
    season: SelectSeasons,
): DashboardCard {
    const currentSeasonEnrollments = getCurrentSeasonEnrollments(enrollments, season);
    const missingPayment = currentSeasonEnrollments.reduce((acc, enrollment) => {
        const missingPayments = ENROLLMENT_PAYMENT_FIELDS.filter((field) => {
            if (field.startsWith('volley') && enrollment.course.activity.key === 'volley') {
                return !enrollment[field];
            }

            if (field.startsWith('gymnastics') && enrollment.course.activity.key === 'gymnastics') {
                return !enrollment[field];
            }

            return false;
        }).length;

        return acc + missingPayments;
    }, 0);

    return {
        icon: 'i-lucide-badge-euro',
        iconColor: 'warning',
        title: $t('card.dashboard.missing_payments'),
        description: missingPayment.toString(),
        badgeLabel: `${season.startYear}/${season.endYear}`,
    };
}

function getCurrentSeasonExpiringCertificate(
    enrollments: SelectEnrollmentsWithRelations[],
    season: SelectSeasons,
): DashboardCard {
    const expiringCertificate = getCurrentSeasonEnrollments(enrollments, season)
        .reduce((acc, enrollment) => {
            if (enrollment.certificateExpirationDate) {
                const expirationDate = new Date(enrollment.certificateExpirationDate);
                const currentDate = new Date();
                const thirtyDaysFromNow = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);

                if (expirationDate > currentDate && expirationDate <= thirtyDaysFromNow) {
                    acc++;
                }
            }

            return acc;
        }, 0);

    return {
        icon: 'i-lucide-briefcase-medical',
        iconColor: 'error',
        title: $t('card.dashboard.expiring_certificates'),
        description: expiringCertificate.toString(),
        badgeLabel: `${season.startYear}/${season.endYear}`,
    };
}

export function getDashboardCards(enrollments: SelectEnrollmentsWithRelations[], season: SelectSeasons) {
    return Object.fromEntries(Object.entries(Object.groupBy(enrollments, (enrollment) => enrollment.activity.key))
        .map(([activity, enrollments]) => {
            return [activity, {
                icon: ACTIVITY_ICONS[activity as ActivityKeys[number]] || DEFAULT_ACTIVITY_ICON,
                title: enrollments?.[0]?.activity.name || '',
                cards: enrollments && [
                    getTotalEnrollmentsCard(enrollments, season),
                    getTotalPaymentsCard(enrollments, season),
                    getCurrentSeasonEnrollmentsCard(enrollments, season),
                    getCurrentSeasonMissingPayments(enrollments, season),
                    getCurrentSeasonExpiringCertificate(enrollments, season),
                ],
            }];
        }),
    );
}
