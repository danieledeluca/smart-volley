import type { AthleteGetPayload, AthleteInclude, AthleteSelect, EnrollmentGetPayload, EnrollmentSelect } from '~~/lib/db/generated/prisma/models';

export const athleteListItemsSelect = {
    id: true,
    name: true,
} satisfies AthleteSelect;

export type AthleteListItem = AthleteGetPayload<{
    select: typeof athleteListItemsSelect;
}>;

export const athleteItemsInclude = {
    parent: true,
    enrollments: {
        include: {
            activity: true,
            season: true,
            course: true,
        },
    },
} satisfies AthleteInclude;

export type AthleteItem = AthleteGetPayload<{
    include: typeof athleteItemsInclude;
}>;

export const enrollmentPaymentsSelect = {
    id: true,
    volley_account: true,
    volley_balance: true,
    volley_balance_secondary: true,
    first_installment: true,
    second_installment: true,
    third_installment: true,
    athlete: {
        select: {
            id: true,
            name: true,
            phone_number: true,
        },
    },
} satisfies EnrollmentSelect;

export type EnrollmentPayment = EnrollmentGetPayload<{
    select: typeof enrollmentPaymentsSelect;
}>;

export const enrollmentCertificatesSelect = {
    id: true,
    certificate_expiration_date: true,
    certificate_download_url: true,
    athlete: {
        select: {
            id: true,
            name: true,
        },
    },
} satisfies EnrollmentSelect;

export type EnrollmentCertificate = EnrollmentGetPayload<{
    select: typeof enrollmentCertificatesSelect;
}>;

export const athleteContactsSelect = {
    id: true,
    name: true,
    phone_number: true,
    email: true,
} satisfies AthleteSelect;

export type AthleteContact = AthleteGetPayload<{
    select: typeof athleteContactsSelect;
}>;
