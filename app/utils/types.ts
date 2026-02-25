import type { AlertProps } from '@nuxt/ui';

export type Message = {
    title: string;
    color: AlertProps['color'];
    icon: string;
};

export type CertificateDateStatus = 'valid' | 'expired' | 'missing';

export type AuthFormFields = 'email' | 'password' | 'confirmPassword';
