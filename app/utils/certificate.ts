import type { BadgeProps } from '@nuxt/ui';

export function getCertificateDateColumnSortingFn(dateA: string | null, dateB: string | null) {
    if (!dateA && !dateB) {
        return 0;
    }

    if (!dateA) {
        return 1;
    }

    if (!dateB) {
        return -1;
    }

    return new Date(dateA).getTime() - new Date(dateB).getTime();
}

export function getCertificateDateStatus(date: string | null): CertificateStatus {
    if (!date) {
        return 'missing';
    }

    const dateTime = new Date(date).getTime();
    const currentTime = Date.now();

    if (dateTime < currentTime) {
        return 'expired';
    }

    return 'valid';
}

export function getCertificateBadgeProps(date: string | null): Pick<BadgeProps, 'color' | 'label'> {
    const status = getCertificateDateStatus(date);

    const badgeColorMap: Record<CertificateStatus, BadgeProps['color']> = {
        valid: 'success',
        missing: 'warning',
        expired: 'error',
    };

    const badgeLabelMap: Record<CertificateStatus, string> = {
        valid: $t('form.field.certificate_status.item.valid'),
        missing: $t('form.field.certificate_status.item.missing'),
        expired: $t('form.field.certificate_status.item.expired'),
    };

    return {
        color: badgeColorMap[status],
        label: badgeLabelMap[status],
    };
}

export function getCertificateTextColor(date: string | null) {
    const status = getCertificateDateStatus(date);

    const textColorMap: Record<CertificateStatus, string> = {
        valid: 'text-success',
        missing: 'text-warning',
        expired: 'text-error',
    };

    return textColorMap[status];
}
