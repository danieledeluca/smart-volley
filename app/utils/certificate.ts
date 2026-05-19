import type { BadgeProps } from '@nuxt/ui';
import type { FetchError } from 'ofetch';

import UBadge from '@nuxt/ui/components/Badge.vue';
import UButton from '@nuxt/ui/components/Button.vue';

import type { CertificateStatusEnum } from '#imports';

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

export function getCertificateDownloadButtonNode(enrollmentId: number) {
    const toast = useToast();

    return h(UButton, {
        color: 'primary',
        variant: 'soft',
        label: $t('form.button.download'),
        icon: 'i-lucide-download',
        loadingAuto: true,
        onClick: async () => {
            try {
                const { url } = await $fetch(`/api/enrollments/${enrollmentId.toString()}/certificate`);

                window.open(url, '_blank');
            } catch (err) {
                const error = err as FetchError;

                toast.add({
                    description: error.statusMessage,
                    color: 'error',
                    icon: 'i-lucide-circle-x',
                });
            }
        },
    });
}
