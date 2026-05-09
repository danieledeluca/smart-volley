import { i18n } from '@better-auth/i18n';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import db from './db';

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
    }),
    advanced: {
        database: {
            generateId: false,
        },
    },
    emailAndPassword: {
        enabled: true,
    },
    emailVerification: {
        sendOnSignUp: true,
    },
    plugins: [
        i18n({
            translations: {
                it: {
                    USER_NOT_FOUND: 'Utente non trovato',
                    INVALID_EMAIL_OR_PASSWORD: 'Email o password non valida',
                    INVALID_PASSWORD: 'Password non valida',
                    CREDENTIAL_ACCOUNT_NOT_FOUND: 'Account con credenziali non trovato',
                    EMAIL_NOT_VERIFIED: 'Email non verificata',
                    SESSION_EXPIRED: 'Sessione scaduta',
                },
            },
        }),
    ],
});
