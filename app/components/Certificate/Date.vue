<script setup lang="ts">
import type { BadgeProps } from '@nuxt/ui';

import type { CertificateStatusEnum } from '#imports';

const { date } = defineProps<{
    date: string | null;
}>();

const status = getCertificateDateStatus(date);

const textColorMap: Record<CertificateStatusEnum, string> = {
    valid: 'text-success',
    missing: 'text-warning',
    expired: 'text-error',
};

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

const textColor = textColorMap[status];
const badgeColor = badgeColorMap[status];
const badgeLabel = badgeLabelMap[status];
</script>

<template>
    <div class="flex items-center gap-2">
        <UBadge variant="subtle" :color="badgeColor" :label="badgeLabel" />
        <span :class="textColor">
            {{ date ? formatDate(date) : EMPTY_VALUE }}
        </span>
    </div>
</template>
