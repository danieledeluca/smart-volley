<script setup lang="ts">
import type { BadgeProps, FormSubmitEvent, TableColumn, TableRow } from '@nuxt/ui';
import type { Row, TableMeta } from '@tanstack/vue-table';

import UBadge from '@nuxt/ui/components/Badge.vue';
import UButton from '@nuxt/ui/components/Button.vue';
import UUser from '@nuxt/ui/components/User.vue';

import TableSortDropdown from '~/components/Athlete/TableSortDropdown.vue';

useSeoMeta({
    title: $t('page.certificates.title'),
});

const isLoading = ref(false);
const isLoaded = ref(false);
const tableData = ref<EnrollmentCertificate[]>([]);

const tableColumns: TableColumn<EnrollmentCertificate>[] = [
    {
        accessorKey: 'athlete',
        header: $t('table.athletes.column.name'),
        cell: ({ row }) => h(UUser, { name: row.original.athlete.name, avatar: { ...getAvatar(row.original.athlete.id.toString(), 64) } }),
    },
    {
        accessorKey: 'certificate_expiration_date',
        header: ({ column }) => h(TableSortDropdown, { column, label: $t('table.athletes.column.certificate_expiration_date.label') }),
        cell: ({ row }) => {
            const status = getCertificateDateStatus(row.original.certificate_expiration_date?.toString());
            const colorMap: Record<CertificateDateStatus, string> = {
                valid: 'text-success',
                missing: 'text-warning',
                expired: 'text-error',
            };

            const badgeColorMap: Record<CertificateDateStatus, BadgeProps['color']> = {
                valid: 'success',
                missing: 'warning',
                expired: 'error',
            };

            const badgeLabelMap: Record<CertificateDateStatus, string> = {
                valid: $t('table.athletes.column.certificate_expiration_date.status.valid'),
                missing: $t('table.athletes.column.certificate_expiration_date.status.missing'),
                expired: $t('table.athletes.column.certificate_expiration_date.status.expired'),
            };

            return h('div', { class: 'flex gap-2 items-center' }, [
                h(UBadge, {
                    color: badgeColorMap[status],
                    class: 'capitalize',
                    label: badgeLabelMap[status],
                }, undefined),
                h('span', {
                    class: `font-semibold ${colorMap[status]}`,
                }, formatDate(row.original.certificate_expiration_date?.toString())),
            ]);
        },
    },
    {
        accessorKey: 'certificate_download_url',
        header: $t('table.athletes.column.certificate_download_url.label'),
        cell: ({ row }) => {
            if (row.original.certificate_download_url) {
                return h(UButton, {
                    color: 'neutral',
                    variant: 'ghost',
                    to: row.original.certificate_download_url,
                    icon: 'i-lucide-download',
                }, $t('table.athletes.column.certificate_download_url.button'));
            }

            return EMPTY_VALUE;
        },
    },
];

const tableMeta: TableMeta<EnrollmentCertificate> = {
    class: {
        tr: (row: Row<EnrollmentCertificate>) => {
            return getCertificateDateStatus(row.original.certificate_expiration_date?.toString());
        },
    },
};

async function onSubmit(event: FormSubmitEvent<AthleteFiltersSchema>) {
    try {
        isLoading.value = true;
        isLoaded.value = false;

        const athletesCertificates = await $fetch<EnrollmentCertificate[]>('/api/certificates', {
            query: {
                season: event.data.season,
                activity: event.data.activity,
            },
        });

        tableData.value = athletesCertificates;
    } finally {
        isLoading.value = false;
        isLoaded.value = true;
    }
}

function onSelect(_event: Event, row: TableRow<EnrollmentCertificate>) {
    return navigateTo(`/enrollments/${row.original.id}`);
}
</script>

<template>
    <AthleteFilters
        :title="$t('page.certificates.title')"
        :isLoading
        icon="i-lucide-file"
        @submit="onSubmit"
    />
    <AthleteTable
        :isLoading
        :isLoaded
        :tableData
        :tableColumns
        :tableMeta
        :onSelect
    />
</template>
