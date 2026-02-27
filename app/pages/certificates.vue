<script setup lang="ts">
import type { BadgeProps, TableColumn, TableRow } from '@nuxt/ui';

import UBadge from '@nuxt/ui/components/Badge.vue';
import UButton from '@nuxt/ui/components/Button.vue';
import UUser from '@nuxt/ui/components/User.vue';

import TableSortDropdown from '~/components/List/TableSortDropdown.vue';

useSeoMeta({
    title: $t('page.certificates.title'),
});

const enrollmentsStore = useEnrollmentsStore();
const {
    enrollments,
    enrollmentsPending,
    enrollmentsState,
    enrollmentsFields,
} = storeToRefs(enrollmentsStore);

const tableColumns: TableColumn<EnrollmentListItem>[] = [
    {
        accessorKey: 'athlete',
        header: ({ column }) => h(TableSortDropdown, { column, label: $t('table.athletes.column.name') }),
        cell: ({ row }) => h(UUser, {
            name: row.original.athlete.name,
            description: `#${row.original.id?.toString()}`,
            avatar: { ...getAvatar(row.original.athlete.id.toString(), 64) },
        }),
    },
    {
        accessorKey: 'certificate_expiration_date',
        header: $t('table.athletes.column.certificate_expiration_date.label'),
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
                h(UBadge, { color: badgeColorMap[status], variant: 'soft' }, badgeLabelMap[status]),
                h('span', {
                    class: `${colorMap[status]}`,
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

function onSelect(_event: Event, row: TableRow<EnrollmentListItem>) {
    return navigateTo(`/enrollments/${row.original.id}`);
}
</script>

<template>
    <UPageHeader
        title="Titolo pagina certificati"
        description="A responsive page header with title, description and actions."
    />
    <ListFilters
        v-model:state="enrollmentsState"
        :isLoading="enrollmentsPending"
        :schema="enrollmentsFiltersSchema"
        :fields="enrollmentsFields"
        @submit="() => enrollmentsStore.refreshEnrollments()"
    />
    <ListTable
        :isLoading="enrollmentsPending"
        :tableData="enrollments"
        :tableColumns
        :onSelect
    />
</template>
