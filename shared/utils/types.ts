import type { EnrollmentListItem } from './db';

export type PaymentFilters = keyof Pick<EnrollmentListItem, 'volley_account'
    | 'volley_balance'
    | 'volley_balance_secondary'
    | 'first_installment'
    | 'second_installment'
    | 'third_installment'>;

export type CertificateDateStatus = 'valid' | 'expired' | 'missing';
