import type { BadgeProps } from '@nuxt/ui';

import UBadge from '@nuxt/ui/components/Badge.vue';

import type { CertificateStatusEnum } from '#imports';

export function getCertificateDateStatus(date: string | null): CertificateStatusEnum {
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

export function getCertificateDateBadgeNode(date: string | null) {
    const status = getCertificateDateStatus(date);
    const badgeColorMap: Record<CertificateStatusEnum, BadgeProps['color']> = {
        valid: 'success',
        missing: 'warning',
        expired: 'error',
    };

    const badgeLabelMap: Record<CertificateStatusEnum, string> = {
        valid: $t('form.field.certificate_status.item.valid'),
        missing: $t('form.field.certificate_status.item.missing'),
        expired: $t('form.field.certificate_status.item.expired'),
    };

    return h(UBadge, { color: badgeColorMap[status], variant: 'soft', label: badgeLabelMap[status] });
}

export function getCertificateDateNode(date: string | null) {
    const status = getCertificateDateStatus(date);
    const colorMap: Record<CertificateStatusEnum, string> = {
        valid: 'text-success',
        missing: 'text-warning',
        expired: 'text-error',
    };

    return h('div', { class: 'flex gap-2 items-center' }, [
        getCertificateDateBadgeNode(date),
        h('span', { class: `${colorMap[status]}` }, date ? formatDate(date) : EMPTY_VALUE),
    ]);
}
