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

function getTotalEnrollmentsCard(
    enrollments: SelectEnrollmentsWithRelations[],
    seasons: SelectSeasons[],
): DashboardCard {
    return {
        icon: 'i-lucide-list',
        title: $t('card.dashboard.total_enrollments'),
        description: enrollments.length.toString(),
        badgeLabel: `${seasons.at(-1)?.startYear}/${seasons[0]?.endYear}`,
    };
}

function getTotalPaymentsCard(enrollments: SelectEnrollmentsWithRelations[], seasons: SelectSeasons[]): DashboardCard {
    const totalPayments = getTotalPayments(enrollments);

    return {
        icon: 'i-lucide-badge-euro',
        iconColor: 'success',
        title: $t('card.dashboard.total_payments'),
        description: formatPrice(totalPayments.toString()),
        badgeLabel: `${seasons.at(-1)?.startYear}/${seasons[0]?.endYear}`,
    };
}

function getCurrentSeasonEnrollmentsCard(
    enrollments: SelectEnrollmentsWithRelations[],
    season: SelectSeasons,
): DashboardCard {
    const currentSeasonEnrollments = getCurrentSeasonEnrollments(enrollments, season);
    const lastSeasonEnrollments = getLastSeasonEnrollments(enrollments, season);

    const badgeLabel = getPercentageLabel(currentSeasonEnrollments.length, lastSeasonEnrollments.length);
    const badgeColorValue = badgeLabel ? Number.parseFloat(badgeLabel) : 0;

    return {
        icon: 'i-lucide-list',
        title: $t('card.dashboard.enrollments'),
        description: currentSeasonEnrollments.length.toString(),
        badgeLabel,
        badgeColor: badgeColorValue > 0 ? 'success' : 'error',
    };
}

function getCurrentSeasonPaymentsCard(
    enrollments: SelectEnrollmentsWithRelations[],
    season: SelectSeasons,
): DashboardCard {
    const currentSeasonEnrollments = getCurrentSeasonEnrollments(enrollments, season);
    const lastSeasonEnrollments = getLastSeasonEnrollments(enrollments, season);

    const currentSeasonPayments = getTotalPayments(currentSeasonEnrollments);
    const lastSeasonPayments = getTotalPayments(lastSeasonEnrollments);

    const badgeLabel = getPercentageLabel(currentSeasonPayments, lastSeasonPayments);
    const badgeColorValue = badgeLabel ? Number.parseFloat(badgeLabel) : 0;

    return {
        icon: 'i-lucide-badge-euro',
        iconColor: 'success',
        title: $t('card.dashboard.payments'),
        description: formatPrice(currentSeasonPayments.toString()),
        badgeLabel,
        badgeColor: badgeColorValue > 0 ? 'success' : 'error',
    };
}

function getCurrentSeasonExpiringCertificateCard(
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
    };
}

export function getDashboardCards(
    enrollments: SelectEnrollmentsWithRelations[],
    seasons: SelectSeasons[],
    season: SelectSeasons,
) {
    return Object.fromEntries(Object.entries(Object.groupBy(enrollments, (enrollment) => enrollment.activity.key))
        .map(([activity, enrollments]) => {
            return [activity, {
                icon: ACTIVITY_ICONS[activity as ActivityKeys[number]] || DEFAULT_ACTIVITY_ICON,
                title: enrollments[0]?.activity.name || '',
                cards: [
                    getCurrentSeasonEnrollmentsCard(enrollments, season),
                    getCurrentSeasonPaymentsCard(enrollments, season),
                    getCurrentSeasonExpiringCertificateCard(enrollments, season),
                    getTotalEnrollmentsCard(enrollments, seasons),
                    getTotalPaymentsCard(enrollments, seasons),
                ],
            }];
        }),
    );
}
