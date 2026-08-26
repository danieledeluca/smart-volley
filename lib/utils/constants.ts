export const ENROLLMENT_PAYMENT_FIELDS = [
    'volleyAccount',
    'volleyBalance',
    'volleySecondBalance',
    'gymnasticsFirstInstallment',
    'gymnasticsSecondInstallment',
    'gymnasticsThirdInstallment',
] as const;

// eslint-disable-next-line style/max-len
export const FISCAL_CODE_REGEX = /^[A-Z]{6}\d{2}[A-EHLMPRST](?:0[1-9]|[12]\d|3[01]|4[1-9]|5\d|6\d|7[01])[A-Z]\d{3}[A-Z]$/;
export const PHONE_NUMBER_REGEX = /^\+?\d{7,15}$/;

export const KILOBYTE = 1024;
export const FILE_MAX_SIZE = 3 * KILOBYTE * KILOBYTE;
export const FILE_ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];

export const A4_WIDTH = 1240;
export const A4_HEIGHT = 1754;
