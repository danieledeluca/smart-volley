import type { BadgeProps, TableColumn, TableRow } from '@nuxt/ui';

import UBadge from '@nuxt/ui/components/Badge.vue';
import UButton from '@nuxt/ui/components/Button.vue';
import UUser from '@nuxt/ui/components/User.vue';

import TableSortDropdown from '~/components/List/TableSortDropdown.vue';

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

export function getAthletesTableColumns(keys: (keyof AthleteListItem)[]) {
    type TableColumns = Partial<Record<keyof AthleteListItem, TableColumn<AthleteListItem>>>;

    const tableColumns: TableColumns = {
        name: {
            accessorKey: 'name',
            header: ({ column }) => h(TableSortDropdown, { column, label: $t('table.column.name') }),
            cell: ({ row }) => h(UUser, {
                name: row.original.name,
                description: `#${row.original.id.toString()}`,
                avatar: { ...getAvatar(row.original.id.toString(), 64) },
            }),
        },
        phone_number: {
            accessorKey: 'phoneNumber',
            header: $t('table.column.phone_number'),
            cell: ({ row }) => {
                return h('div', { class: 'flex gap-2 items-center' }, [
                    h(UButton, {
                        color: 'primary',
                        variant: 'ghost',
                        href: `tel:${row.original.phone_number}`,
                        icon: 'i-lucide-phone',
                    }),
                    h(UButton, {
                        color: 'primary',
                        variant: 'ghost',
                        href: `https://api.whatsapp.com/send?phone=${row.original.phone_number}`,
                        target: '_blank',
                        icon: 'i-ic-baseline-whatsapp',
                    }),
                    h('span', undefined, row.original.phone_number),
                ]);
            },
        },
        email: {
            accessorKey: 'email',
            header: $t('table.column.email'),
            cell: ({ row }) => {
                if (row.original.email) {
                    return h('div', { class: 'flex gap-2 items-center' }, [
                        h(UButton, {
                            color: 'primary',
                            variant: 'ghost',
                            href: `mailto:${row.original.email}`,
                            icon: 'i-lucide-mail',
                        }),
                        h('span', undefined, row.original.email),
                    ]);
                }

                return EMPTY_VALUE;
            },
        },
    };

    return keys.map((key) => tableColumns[key]).filter((column) => !!column);
}

export function getAthleteEnrollmentsTableColumns(keys: (keyof AthleteItem['enrollments'][number])[]) {
    type TableColumns = Partial<Record<
        keyof AthleteItem['enrollments'][number],
        TableColumn<AthleteItem['enrollments'][number]>
    >>;

    const tableColumns: TableColumns = {
        season: {
            accessorKey: 'season',
            header: $t('table.column.season'),
            cell: ({ row }) => `${row.original.season.starter_year} - ${row.original.season.end_year}`,
        },
        activity: {
            accessorKey: 'activity',
            header: $t('table.column.activity'),
            cell: ({ row }) => row.original.activity.name,
        },
        course: {
            accessorKey: 'course',
            header: $t('table.column.course'),
            cell: ({ row }) => row.original.course.name,
        },
    };

    return keys.map((key) => tableColumns[key]).filter((column) => !!column);
}

export function getEnrollmentsTableColumns(keys: (keyof EnrollmentListItem)[]) {
    type TableColumns = Partial<Record<keyof EnrollmentListItem, TableColumn<EnrollmentListItem>>>;

    const tableColumns: TableColumns = {
        athlete: {
            accessorKey: 'athlete',
            header: ({ column }) => h(TableSortDropdown, { column, label: $t('table.column.name') }),
            cell: ({ row }) => h(UUser, {
                name: row.original.athlete.name,
                description: `#${row.original.id.toString()}`,
                avatar: { ...getAvatar(row.original.athlete.id.toString(), 64) },
            }),
        },
        season: {
            accessorKey: 'season',
            header: $t('table.column.season'),
            cell: ({ row }) => `${row.original.season.starter_year} - ${row.original.season.end_year}`,
        },
        activity: {
            accessorKey: 'season',
            header: $t('table.column.activity'),
            cell: ({ row }) => row.original.activity.name,
        },
        course: {
            accessorKey: 'course',
            header: $t('table.column.course'),
            cell: ({ row }) => row.original.course.name,
        },
        volley_account: {
            accessorKey: 'volley_account',
            header: $t('table.column.volley_account'),
            cell: ({ row }) => formatPrice(row.original.volley_account),
            meta: {
                class: {
                    th: 'text-center',
                    td: 'text-center',
                },
            },
        },
        volley_balance: {
            accessorKey: 'volley_balance',
            header: $t('table.column.volley_balance'),
            cell: ({ row }) => formatPrice(row.original.volley_balance),
            meta: {
                class: {
                    th: 'text-center',
                    td: 'text-center',
                },
            },
        },
        volley_balance_secondary: {
            accessorKey: 'volley_balance_secondary',
            header: $t('table.column.volley_balance_secondary'),
            cell: ({ row }) => formatPrice(row.original.volley_balance_secondary),
            meta: {
                class: {
                    th: 'text-center',
                    td: 'text-center',
                },
            },
        },
        first_installment: {
            accessorKey: 'first_installment',
            header: $t('table.column.first_installment'),
            cell: ({ row }) => formatPrice(row.original.first_installment),
            meta: {
                class: {
                    th: 'text-center',
                    td: 'text-center',
                },
            },
        },
        second_installment: {
            accessorKey: 'second_installment',
            header: $t('table.column.second_installment'),
            cell: ({ row }) => formatPrice(row.original.second_installment),
            meta: {
                class: {
                    th: 'text-center',
                    td: 'text-center',
                },
            },
        },
        third_installment: {
            accessorKey: 'third_installment',
            header: $t('table.column.third_installment'),
            cell: ({ row }) => formatPrice(row.original.third_installment),
            meta: {
                class: {
                    th: 'text-center',
                    td: 'text-center',
                },
            },
        },
        certificate_expiration_date: {
            accessorKey: 'certificate_expiration_date',
            header: $t('table.column.certificate.expiration_date.label'),
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
                    valid: $t('table.column.certificate.expiration_date.status.valid'),
                    missing: $t('table.column.certificate.expiration_date.status.missing'),
                    expired: $t('table.column.certificate.expiration_date.status.expired'),
                };

                return h('div', { class: 'flex gap-2 items-center' }, [
                    h(UBadge, { color: badgeColorMap[status], variant: 'soft', label: badgeLabelMap[status] }),
                    h('span', {
                        class: `${colorMap[status]}`,
                    }, formatDate(row.original.certificate_expiration_date?.toString())),
                ]);
            },
        },
        certificate_download_url: {
            accessorKey: 'certificate_download_url',
            header: $t('table.column.certificate.download_url.label'),
            cell: ({ row }) => {
                if (row.original.certificate_download_url) {
                    return h(UButton, {
                        color: 'primary',
                        variant: 'soft',
                        to: row.original.certificate_download_url,
                        icon: 'i-lucide-download',
                        label: $t('table.column.certificate.download_url.button'),
                    });
                }

                return EMPTY_VALUE;
            },
        },
    };

    return keys.map((key) => tableColumns[key]).filter((column) => !!column);
}

export function onAthleteSelect(_event: Event, row: TableRow<AthleteListItem>) {
    return navigateTo(`/athletes/${row.original.id}`);
}

export function onEnrollmentSelect(_event: Event, row: TableRow<EnrollmentListItem>) {
    return navigateTo(`/enrollments/${row.original.id}`);
}
