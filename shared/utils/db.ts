import type { AthleteGetPayload, AthleteSelect } from '~~/lib/db/generated/prisma/models';

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
