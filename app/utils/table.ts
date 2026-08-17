import type { TableColumn } from '@nuxt/ui';
import type {
    SelectAthletes,
    SelectAthleteWithRelations,
    SelectEnrollmentsWithRelations,
    SelectEnrollmentWithRelations,
    SelectParents,
} from '~~/lib/db/schema';
import type { ComponentProps } from 'vue-component-type-helpers';

import UCheckbox from '@nuxt/ui/components/Checkbox.vue';

import User from '~/components/App/User.vue';
import CertificateDate from '~/components/Certificate/Date.vue';
import CertificateDownloadButton from '~/components/Certificate/DownloadButton.vue';
import EmailButton from '~/components/EmailButton.vue';
import TableSortDropdown from '~/components/List/TableSortDropdown.vue';
import PhoneNumberButtons from '~/components/PhoneNumberButtons.vue';

type TableColumns<T> = Partial<Record<keyof T, TableColumn<T>>>;

// Common columns
function getIdTableColumn<T extends { id: number }>(): TableColumn<T> {
    return {
        accessorKey: 'id',
        header: ({ column }) => h(TableSortDropdown, { column, label: $t('table.column.id') }),
        cell: ({ row }) => `#${row.original.id}`,
    };
}

function getNameTableColumn<T extends { id: number; name: string; fiscalCode: string }>(
    detailPagePath?: string,
): TableColumn<T> {
    return {
        accessorKey: 'name',
        header: ({ column }) => h(TableSortDropdown, { column, label: $t('table.column.name') }),
        cell: ({ row }) => h(User, {
            userProps: {
                name: row.original.name,
                description: row.original.fiscalCode,
                to: detailPagePath ? detailPagePath + row.original.id.toString() : undefined,
            },
            avatarSize: 64,
        }),
    };
}

function getPhoneNumberTableColumn<T extends { phoneNumber: string | null }>(): TableColumn<T> {
    return {
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
    };
}

function getEmailTableColumn<T extends { email: string | null }>(): TableColumn<T> {
    return {
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
    };
}

function getSeasonTableColumn<T extends { season: { startYear: number; endYear: number } }>(): TableColumn<T> {
    return {
        accessorKey: 'season',
        header: $t('table.column.season'),
        cell: ({ row }) => `${row.original.season.startYear} - ${row.original.season.endYear}`,
    };
}

function getActivityTableColumn<T extends { activity: { name: string } }>(): TableColumn<T> {
    return {
        accessorKey: 'activity',
        header: $t('table.column.activity'),
        cell: ({ row }) => row.original.activity.name,
    };
}

function getCourseTableColumn<T extends { course: { code: string; name: string | null } }>(): TableColumn<T> {
    return {
        accessorKey: 'course',
        header: $t('table.column.course'),
        cell: ({ row }) => {
            if (row.original.course.name) {
                return [
                    h('span', undefined, row.original.course.code),
                    h('span', { class: 'text-xs' }, ` - ${row.original.course.name}`),
                ];
            }

            return row.original.course.code;
        },
    };
}

function getPriceTableColum<T>(accessorKey: keyof T, header: string): TableColumn<T> {
    return {
        accessorKey,
        header,
        cell: ({ row }) => {
            const value = row.original[accessorKey] as string | undefined;
            return value ? formatPrice(value) : EMPTY_VALUE;
        },
        meta: {
            class: {
                th: 'text-center',
                td: 'text-center',
            },
        },
    };
}

export function getActionsTableColumn<T extends { id: number }, C extends Component>(
    component: C,
    props: (row: T) => ComponentProps<C>,
): TableColumn<T> {
    return {
        id: 'actions',
        cell: ({ row }) => h(component, props(row.original)),
        meta: {
            class: {
                td: 'text-right',
            },
        },
    };
}

export function getSelectTableColumn<T>(): TableColumn<T> {
    return {
        id: 'select',
        header: ({ table }) =>
            h(UCheckbox, {
                'modelValue': table.getIsSomePageRowsSelected()
                    ? 'indeterminate'
                    : table.getIsAllPageRowsSelected(),
                'onUpdate:modelValue': (value) => table.toggleAllPageRowsSelected(!!value),
            }),
        cell: ({ row }) =>
            h(UCheckbox, {
                'modelValue': row.getIsSelected(),
                'onUpdate:modelValue': (value) => row.toggleSelected(!!value),
            }),
    };
}

// Athletes
export function getAthletesTableColumns(columns: (keyof SelectAthletes)[]) {
    const tableColumns: TableColumns<SelectAthletes> = {
        id: getIdTableColumn(),
        name: getNameTableColumn(`/dashboard/athletes/`),
        phoneNumber: getPhoneNumberTableColumn(),
        email: getEmailTableColumn(),
    };

    return columns.map((column) => tableColumns[column]).filter((column) => !!column);
}

export function getAthleteEnrollmentsTableColumns(
    columns: (keyof SelectAthleteWithRelations['enrollments'][number])[],
) {
    const tableColumns: TableColumns<SelectAthleteWithRelations['enrollments'][number]> = {
        season: getSeasonTableColumn(),
        activity: getActivityTableColumn(),
        course: getCourseTableColumn(),
    };

    return columns.map((column) => tableColumns[column]).filter((column) => !!column);
}

// Parents
export function getParentsTableColumns(columns: (keyof SelectParents)[]) {
    const tableColumns: TableColumns<SelectParents> = {
        id: getIdTableColumn(),
        name: getNameTableColumn(),
        phoneNumber: getPhoneNumberTableColumn(),
        email: getEmailTableColumn(),
    };

    return columns.map((column) => tableColumns[column]).filter((column) => !!column);
}

// Enrollments
export function getEnrollmentsTableColumns(columns: (keyof SelectEnrollmentsWithRelations)[]) {
    const tableColumns: TableColumns<SelectEnrollmentsWithRelations> = {
        id: getIdTableColumn(),
        athlete: {
            accessorKey: 'athlete',
            header: ({ column }) => h(TableSortDropdown, { column, label: $t('table.column.athlete') }),
            cell: ({ row }) => h(User, {
                userProps: {
                    name: row.original.athlete.name,
                    description: row.original.athlete.fiscalCode,
                    to: `/dashboard/enrollments/${row.original.id}`,
                },
                avatarSize: 64,
            }),
        },
        season: getSeasonTableColumn(),
        activity: getActivityTableColumn(),
        course: getCourseTableColumn(),
        volleyAccount: getPriceTableColum('volleyAccount', $t('table.column.volley_account')),
        volleyBalance: getPriceTableColum('volleyBalance', $t('table.column.volley_balance')),
        volleySecondBalance: getPriceTableColum(
            'volleySecondBalance',
            $t('table.column.volley_second_balance'),
        ),
        gymnasticsFirstInstallment: getPriceTableColum(
            'gymnasticsFirstInstallment',
            $t('table.column.gymnastics_first_installment'),
        ),
        gymnasticsSecondInstallment: getPriceTableColum(
            'gymnasticsSecondInstallment',
            $t('table.column.gymnastics_second_installment'),
        ),
        gymnasticsThirdInstallment: getPriceTableColum(
            'gymnasticsThirdInstallment',
            $t('table.column.gymnastics_third_installment'),
        ),
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

export function getEnrollmentPaymentsTableColumns(
    columns: (keyof SelectEnrollmentWithRelations['payments'][number])[],
) {
    const tableColumns: TableColumns<SelectEnrollmentWithRelations['payments'][number]> = {
        name: {
            accessorKey: 'name',
            header: $t('table.column.payment_name'),
            cell: ({ row }) => $t(`table.column.${camelToSnakeCase(row.original.name)}`),
        },
        amount: {
            accessorKey: 'amount',
            header: $t('table.column.payment_amount'),
            cell: ({ row }) => row.original.amount ? formatPrice(row.original.amount) : EMPTY_VALUE,
        },
        date: {
            accessorKey: 'date',
            header: $t('table.column.payment_date'),
            cell: ({ row }) => row.original.date ? formatDate(row.original.date) : EMPTY_VALUE,
        },
        type: {
            accessorKey: 'type',
            header: $t('table.column.payment_type'),
            cell: ({ row }) => row.original.type
                ? $t(`form.field.payment_type.item.${row.original.type}`)
                : EMPTY_VALUE,
        },
    };

    return columns.map((column) => tableColumns[column]).filter((column) => !!column);
}
