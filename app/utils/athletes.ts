import type { BadgeProps, TableColumn } from '@nuxt/ui';
import type { Column, ColumnMeta } from '@tanstack/vue-table';

import UBadge from '@nuxt/ui/components/Badge.vue';
import UButton from '@nuxt/ui/components/Button.vue';

import TableSortDropdown from '~/components/Athlete/TableSortDropdown.vue';

export function getCertificateDateStatus(date: string | null | undefined): CertificateDateStatus {
    if (!date) {
        return 'missing';
    }

    const dateTime = new Date(date).getTime();
    const currentTime = new Date().getTime();

    if (dateTime < currentTime) {
        return 'expired';
    }

    return 'valid';
}

function getTableColumnHeader<T>(column: Column<T>, label: string) {
    return h(TableSortDropdown, { column: column as Column<unknown>, label });
}

function getTableMetaPriceColumn(): ColumnMeta<any, any> {
    return {
        class: {
            th: 'text-center',
            td: 'text-center',
        },
    };
}

export function getTableColumns<T extends Partial<FullAthlete>>(keys: readonly (keyof T)[]): TableColumn<T>[] {
    const tableColumnsMap: Partial<Record<keyof FullAthlete, TableColumn<T>>> = {
        name: {
            accessorKey: 'name',
            header: $t('table.athletes.columns.name'),
            cell: ({ row }) => {
                return h('div', { class: 'flex gap-2 items-center' }, [
                    h(UButton, { color: 'primary', variant: 'ghost', href: `/athletes/${row.original.id}`, icon: 'i-lucide-user' }),
                    h('span', undefined, row.original.name),
                ]);
            },
        },
        phoneNumber: {
            accessorKey: 'phoneNumber',
            header: $t('table.athletes.columns.phone_number'),
            cell: ({ row }) => {
                return h('div', { class: 'flex gap-2 items-center' }, [
                    h(UButton, {
                        color: 'primary',
                        variant: 'ghost',
                        href: `tel:${row.original.phoneNumber}`,
                        icon: 'i-lucide-phone',
                    }),
                    h(UButton, {
                        color: 'primary',
                        variant: 'ghost',
                        href: `https://api.whatsapp.com/send?phone=${row.original.phoneNumber}`,
                        target: '_blank',
                        icon: 'i-ic-baseline-whatsapp',
                    }),
                    h('span', undefined, row.original.phoneNumber),
                ]);
            },
        },
        email: {
            accessorKey: 'email',
            header: $t('table.athletes.columns.email'),
            cell: ({ row }) => {
                return h('div', { class: 'flex gap-2 items-center' }, [
                    h(UButton, {
                        color: 'primary',
                        variant: 'ghost',
                        href: `mailto:${row.original.email}`,
                        icon: 'i-lucide-mail',
                    }),
                    h('span', undefined, row.original.email),
                ]);
            },
        },
        volleyAccount: {
            accessorKey: 'volleyAccount',
            header: $t('table.athletes.columns.volley_account'),
            cell: ({ row }) => formatPrice(row.original.volleyAccount?.toString()),
            meta: getTableMetaPriceColumn(),
        },
        volleyBalance: {
            accessorKey: 'volleyBalance',
            header: $t('table.athletes.columns.volley_balance'),
            cell: ({ row }) => formatPrice(row.original.volleyBalance?.toString()),
            meta: getTableMetaPriceColumn(),
        },
        volleyBalanceSecondary: {
            accessorKey: 'volleyBalanceSecondary',
            header: $t('table.athletes.columns.volley_balance_secondary'),
            cell: ({ row }) => formatPrice(row.original.volleyBalanceSecondary?.toString()),
            meta: getTableMetaPriceColumn(),
        },
        firstInstallment: {
            accessorKey: 'firstInstallment',
            header: $t('table.athletes.columns.fist_installment'),
            cell: ({ row }) => formatPrice(row.original.firstInstallment?.toString()),
            meta: getTableMetaPriceColumn(),
        },
        secondInstallment: {
            accessorKey: 'secondInstallment',
            header: $t('table.athletes.columns.second_installment'),
            cell: ({ row }) => formatPrice(row.original.secondInstallment?.toString()),
            meta: getTableMetaPriceColumn(),
        },
        thirdInstallment: {
            accessorKey: 'thirdInstallment',
            header: $t('table.athletes.columns.third_installment'),
            cell: ({ row }) => formatPrice(row.original.thirdInstallment?.toString()),
            meta: getTableMetaPriceColumn(),
        },
        certificateExpirationDate: {
            accessorKey: 'certificateExpirationDate',
            header: $t('table.athletes.columns.certificate_expiration_date.label'),
            cell: ({ row }) => {
                const status = getCertificateDateStatus(row.original.certificateExpirationDate?.toString());
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
                    valid: $t('table.athletes.columns.certificate_expiration_date.status.valid'),
                    missing: $t('table.athletes.columns.certificate_expiration_date.status.missing'),
                    expired: $t('table.athletes.columns.certificate_expiration_date.status.expired'),
                };

                return h('div', { class: 'flex gap-2 items-center' }, [
                    h(UBadge, { color: badgeColorMap[status], class: 'capitalize', label: badgeLabelMap[status] }, undefined),
                    h('span', { class: `font-semibold ${colorMap[status]}` }, formatDate(row.original.certificateExpirationDate?.toString())),

                ]);
            },
        },
        certificateDownloadUrl: {
            accessorKey: 'certificateDownloadUrl',
            header: 'Scarica certificato',
            cell: ({ row }) => {
                if (row.original.certificateDownloadUrl) {
                    return h(UButton, {
                        color: 'neutral',
                        variant: 'ghost',
                        to: row.original.certificateDownloadUrl,
                        icon: 'i-lucide-download',
                    }, 'Scarica');
                }

                return EMPTY_VALUE;
            },
        },
        season: {
            accessorKey: 'season',
            header: ({ column }) => getTableColumnHeader(column, $t('table.athletes.columns.season')),
            cell: ({ row }) => `${row.original.season?.starterYear} - ${row.original.season?.endYear}`,
        },
        activity: {
            accessorKey: 'activity',
            header: ({ column }) => getTableColumnHeader(column, $t('table.athletes.columns.activity')),
            cell: ({ row }) => row.original.activity?.name,
        },
    };

    return keys
        .filter((key): key is keyof FullAthlete => key in tableColumnsMap)
        .map((key) => tableColumnsMap[key]!);
}
