import type {
    AthleteGetPayload,
    AthleteInclude,
    AthleteSelect,
    EnrollmentGetPayload,
    EnrollmentInclude,
    EnrollmentSelect,
} from '~~/prisma/generated/prisma/models';

export const enrollmentListItemsSelect = {
    id: true,
    volley_account: true,
    volley_balance: true,
    volley_balance_secondary: true,
    first_installment: true,
    second_installment: true,
    third_installment: true,
    certificate_expiration_date: true,
    certificate_download_url: true,
    season: true,
    activity: true,
    course: true,
    athlete: {
        select: {
            id: true,
            name: true,
        },
    },
} satisfies EnrollmentSelect;

export type EnrollmentListItem = EnrollmentGetPayload<{
    select: typeof enrollmentListItemsSelect;
}>;

export const enrollmentItemsInclude = {
    season: true,
    activity: true,
    course: true,
    athlete: {
        select: {
            id: true,
            name: true,
        },
    },
} satisfies EnrollmentInclude;

export type EnrollmentItem = EnrollmentGetPayload<{
    include: typeof enrollmentItemsInclude;
}>;

export const athleteListItemsSelect = {
    id: true,
    name: true,
    phone_number: true,
    email: true,
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
