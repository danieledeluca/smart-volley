import type { AthleteGetPayload, AthleteInclude, AthleteSelect } from '~~/lib/db/generated/prisma/models';

export const athleteListItemsSelect = {
    id: true,
    name: true,
    activity: true,
    season: true,
} satisfies AthleteSelect;

export type AthleteListItem = AthleteGetPayload<{
    select: typeof athleteListItemsSelect;
}>;

export const athleteItemsInclude = {
    activity: true,
    course: true,
    parent: true,
    season: true,
} satisfies AthleteInclude;

export type AthleteItem = AthleteGetPayload<{
    include: typeof athleteItemsInclude;
}>;

export const athletePaymentsSelect = {
    id: true,
    name: true,
    phoneNumber: true,
    volleyAccount: true,
    volleyBalance: true,
    volleyBalanceSecondary: true,
    firstInstallment: true,
    secondInstallment: true,
    thirdInstallment: true,
} satisfies AthleteSelect;

export type AthletePayment = AthleteGetPayload<{
    select: typeof athletePaymentsSelect;
}>;

export const athleteCertificatesSelect = {
    id: true,
    name: true,
    certificateExpirationDate: true,
    certificateDownloadUrl: true,
} satisfies AthleteSelect;

export type AthleteCertificate = AthleteGetPayload<{
    select: typeof athleteCertificatesSelect;
}>;

export const athleteContactsSelect = {
    id: true,
    name: true,
    phoneNumber: true,
    email: true,
} satisfies AthleteSelect;

export type AthleteContact = AthleteGetPayload<{
    select: typeof athleteContactsSelect;
}>;
