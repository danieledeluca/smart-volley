import type { TableColumn, TableRow } from '@nuxt/ui';
import type { FindAthlete, FindAthletes, FindEnrollments } from '~~/lib/db/schema';

import User from '~/components/App/User.vue';
import AthleteActions from '~/components/Athlete/Actions.vue';
import CertificateDate from '~/components/Certificate/Date.vue';
import CertificateDownloadButton from '~/components/Certificate/DownloadButton.vue';
import EmailButton from '~/components/EmailButton.vue';
import EnrollmentActions from '~/components/Enrollment/Actions.vue';
import TableSortDropdown from '~/components/List/TableSortDropdown.vue';
import PhoneNumberButtons from '~/components/PhoneNumberButtons.vue';

export function getAthletesTableColumns(columns: (keyof FindAthletes)[]) {
    type TableColumns = Partial<Record<keyof FindAthletes, TableColumn<FindAthletes>>>;

    const tableColumns: TableColumns = {
        id: {
            accessorKey: 'id',
            header: $t('table.column.id'),
            cell: ({ row }) => `#${row.original.id}`,
        },
        name: {
            accessorKey: 'name',
            header: ({ column }) => h(TableSortDropdown, { column, label: $t('table.column.name') }),
            cell: ({ row }) => h(User, {
                userProps: {
                    name: row.original.name,
                    description: row.original.fiscalCode,
                },
                avatarSize: 64,
            }),
        },
        phoneNumber: {
            accessorKey: 'phoneNumber',
            header: $t('table.column.phone_number'),
            cell: ({ row }) => {
                if (row.original.phoneNumber) {
                    return h('div', { class: 'flex gap-2 items-center' }, [
                        h(PhoneNumberButtons, { phoneNumber: row.original.phoneNumber }),
                        h('span', undefined, row.original.phoneNumber),
                    ]);
                }

                return EMPTY_VALUE;
            },
        },
        email: {
            accessorKey: 'email',
            header: $t('table.column.email'),
            cell: ({ row }) => {
                if (row.original.email) {
                    return h('div', { class: 'flex gap-2 items-center' }, [
                        h(EmailButton, { email: row.original.email }),
                        h('span', undefined, row.original.email),
                    ]);
                }

                return EMPTY_VALUE;
            },
        },
    };

    return columns.map((column) => tableColumns[column]).filter((column) => !!column);
}

export function getAthletesTableActionsColumn(): TableColumn<FindAthletes> {
    return {
        id: 'actions',
        meta: {
            class: {
                td: 'text-right',
            },
        },
        cell: ({ row }) => h(AthleteActions, { athleteId: row.original.id }),
    };
}

export function getAthleteEnrollmentsTableColumns(columns: (keyof FindAthlete['enrollments'][number])[]) {
    type TableColumns = Partial<Record<
        keyof FindAthlete['enrollments'][number],
        TableColumn<FindAthlete['enrollments'][number]>
    >>;

    const tableColumns: TableColumns = {
        season: {
            accessorKey: 'season',
            header: $t('table.column.season'),
            cell: ({ row }) => `${row.original.season.startYear} - ${row.original.season.endYear}`,
        },
        activity: {
            accessorKey: 'activity',
            header: $t('table.column.activity'),
            cell: ({ row }) => row.original.activity.name,
        },
        course: {
            accessorKey: 'course',
            header: $t('table.column.course'),
            cell: ({ row }) => {
                if (row.original.course.description) {
                    return [
                        h('span', undefined, row.original.course.name),
                        h('span', { class: 'text-xs' }, ` - ${row.original.course.description}`),
                    ];
                }

                return row.original.course.name;
            },
        },
    };

    return columns.map((column) => tableColumns[column]).filter((column) => !!column);
}

export function getEnrollmentsTableColumns(columns: (keyof FindEnrollments)[]) {
    type TableColumns = Partial<Record<keyof FindEnrollments, TableColumn<FindEnrollments>>>;

    const tableColumns: TableColumns = {
        id: {
            accessorKey: 'id',
            header: $t('table.column.id'),
            cell: ({ row }) => `#${row.original.id}`,
        },
        athlete: {
            accessorKey: 'athlete',
            header: ({ column }) => h(TableSortDropdown, { column, label: $t('table.column.athlete') }),
            cell: ({ row }) => h(User, {
                userProps: {
                    name: row.original.athlete.name,
                    description: row.original.athlete.fiscalCode,
                },
                avatarSize: 64,
            }),
        },
        season: {
            accessorKey: 'season',
            header: $t('table.column.season'),
            cell: ({ row }) => `${row.original.season.startYear} - ${row.original.season.endYear}`,
        },
        activity: {
            accessorKey: 'activity',
            header: $t('table.column.activity'),
            cell: ({ row }) => row.original.activity.name,
        },
        course: {
            accessorKey: 'course',
            header: $t('table.column.course'),
            cell: ({ row }) => {
                if (row.original.course.description) {
                    return [
                        h('span', undefined, row.original.course.name),
                        h('span', { class: 'text-xs' }, ` - ${row.original.course.description}`),
                    ];
                }

                return row.original.course.name;
            },
        },
        volleyAccount: {
            accessorKey: 'volley_account',
            header: $t('table.column.volley_account'),
            cell: ({ row }) => row.original.volleyAccount ? formatPrice(row.original.volleyAccount) : EMPTY_VALUE,
            meta: {
                class: {
                    th: 'text-center',
                    td: 'text-center',
                },
            },
        },
        volleyBalance: {
            accessorKey: 'volley_balance',
            header: $t('table.column.volley_balance'),
            cell: ({ row }) => row.original.volleyBalance ? formatPrice(row.original.volleyBalance) : EMPTY_VALUE,
            meta: {
                class: {
                    th: 'text-center',
                    td: 'text-center',
                },
            },
        },
        volleyBalanceSecondary: {
            accessorKey: 'volley_balance_secondary',
            header: $t('table.column.volley_balance_secondary'),
            cell: ({ row }) => row.original.volleyBalanceSecondary
                ? formatPrice(row.original.volleyBalanceSecondary)
                : EMPTY_VALUE,
            meta: {
                class: {
                    th: 'text-center',
                    td: 'text-center',
                },
            },
        },
        firstInstallment: {
            accessorKey: 'first_installment',
            header: $t('table.column.first_installment'),
            cell: ({ row }) => row.original.firstInstallment ? formatPrice(row.original.firstInstallment) : EMPTY_VALUE,
            meta: {
                class: {
                    th: 'text-center',
                    td: 'text-center',
                },
            },
        },
        secondInstallment: {
            accessorKey: 'second_installment',
            header: $t('table.column.second_installment'),
            cell: ({ row }) => row.original.secondInstallment
                ? formatPrice(row.original.secondInstallment)
                : EMPTY_VALUE,
            meta: {
                class: {
                    th: 'text-center',
                    td: 'text-center',
                },
            },
        },
        thirdInstallment: {
            accessorKey: 'third_installment',
            header: $t('table.column.third_installment'),
            cell: ({ row }) => row.original.thirdInstallment ? formatPrice(row.original.thirdInstallment) : EMPTY_VALUE,
            meta: {
                class: {
                    th: 'text-center',
                    td: 'text-center',
                },
            },
        },
        certificateExpirationDate: {
            accessorKey: 'certificate_expiration_date',
            header: ({ column }) => h(TableSortDropdown, {
                column,
                label: $t('table.column.certificate_expiration_date'),
            }),
            cell: ({ row }) => row.original.certificateExpirationDate
                ? h(CertificateDate, { date: row.original.certificateExpirationDate })
                : EMPTY_VALUE,
            sortingFn: (rowA, rowB) => getCertificateDateColumnSortingFn(
                rowA.original.certificateExpirationDate,
                rowB.original.certificateExpirationDate,
            ),
        },
        certificateFile: {
            accessorKey: 'certificate_download_url',
            header: $t('table.column.certificate_download_url'),
            cell: ({ row }) => row.original.certificateFile
                ? h(CertificateDownloadButton, { enrollmentId: row.original.id })
                : EMPTY_VALUE,
        },
    };

    return columns.map((column) => tableColumns[column]).filter((column) => !!column);
}

export function getEnrollmentsTableActionsColumn(): TableColumn<FindEnrollments> {
    return {
        id: 'actions',
        meta: {
            class: {
                td: 'text-right',
            },
        },
        cell: ({ row }) => h(EnrollmentActions, { enrollmentId: row.original.id }),
    };
}

export function onEnrollmentSelect(_event: Event, row: TableRow<FindEnrollments>) {
    return navigateTo(`/dashboard/enrollments/${row.original.id}`);
}
