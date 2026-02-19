import type { BadgeProps, TableColumn } from '@nuxt/ui';
import type { Athlete } from '~~/lib/db/generated/prisma/client';

import UBadge from '@nuxt/ui/components/Badge.vue';
import UButton from '@nuxt/ui/components/Button.vue';

export function getCertificateDateStatus(date: string | null): CertificateDateStatus {
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

export function getTableColumns<T = Partial<Athlete>>(keys: (keyof T)[]): TableColumn<T>[] {
    const tableColumnsMap: Partial<Record<keyof Athlete, TableColumn<T>>> = {
        name: {
            accessorKey: 'name',
            header: 'Nome',
            cell: ({ row }) => {
                return h('div', { class: 'flex gap-2 items-center' }, [
                    h(UButton, { color: 'primary', variant: 'ghost', href: `/athletes/${row.original.id}`, icon: 'i-lucide-user' }),
                    h('span', undefined, row.original.name),
                ]);
            },
        },
        phoneNumber: {
            accessorKey: 'phoneNumber',
            header: 'Numero di telefono',
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
            header: 'Email',
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
            header: 'Acconto volley',
            cell: ({ row }) => formatPrice(row.original.volleyAccount?.toString() || ''),
            meta: {
                class: {
                    th: 'text-center',
                    td: 'text-center',
                },
            },
        },
        volleyBalance: {
            accessorKey: 'volleyBalance',
            header: 'Saldo volley',
            cell: ({ row }) => formatPrice(row.original.volleyBalance?.toString() || ''),
            meta: {
                class: {
                    th: 'text-center',
                    td: 'text-center',
                },
            },
        },
        volleyBalanceSecondary: {
            accessorKey: 'volleyBalanceSecondary',
            header: 'Saldo volley 2',
            cell: ({ row }) => formatPrice(row.original.volleyBalanceSecondary?.toString() || ''),
            meta: {
                class: {
                    th: 'text-center',
                    td: 'text-center',
                },
            },
        },
        firstInstallment: {
            accessorKey: 'firstInstallment',
            header: '1^ rata',
            cell: ({ row }) => formatPrice(row.original.firstInstallment?.toString() || ''),
            meta: {
                class: {
                    th: 'text-center',
                    td: 'text-center',
                },
            },
        },
        secondInstallment: {
            accessorKey: 'secondInstallment',
            header: '2^ rata',
            cell: ({ row }) => formatPrice(row.original.secondInstallment?.toString() || ''),
            meta: {
                class: {
                    th: 'text-center',
                    td: 'text-center',
                },
            },
        },
        thirdInstallment: {
            accessorKey: 'thirdInstallment',
            header: '3^ rata',
            cell: ({ row }) => formatPrice(row.original.thirdInstallment?.toString() || ''),
            meta: {
                class: {
                    th: 'text-center',
                    td: 'text-center',
                },
            },
        },
        certificateExpirationDate: {
            accessorKey: 'certificateExpirationDate',
            header: 'Scadenza certificato',
            cell: ({ row }) => {
                const status = getCertificateDateStatus(row.original.certificateExpirationDate?.toString() || '');
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

                return h('div', { class: 'flex gap-2 items-center' }, [
                    h(UBadge, { color: badgeColorMap[status], class: 'capitalize' }, status),
                    h('span', { class: `font-semibold ${colorMap[status]}` }, formatDate(row.original.certificateExpirationDate?.toString() || '')),

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
    };

    return keys.filter((key) => key in tableColumnsMap).map((key) => tableColumnsMap[key as keyof typeof tableColumnsMap]!);
}
