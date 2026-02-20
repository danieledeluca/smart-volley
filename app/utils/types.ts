export type Message = {
    title: string;
    color: 'error' | 'success' | 'primary' | 'secondary' | 'info' | 'warning' | 'neutral';
    icon: string;
};

export type CertificateDateStatus = 'valid' | 'expired' | 'missing';

export type AuthFormFields = 'email' | 'password' | 'confirmPassword';
