const i18n = {
    auth: {
        forgot_password: {
            description: 'Inserisci la tua email e ti invieremo un link di recupero.',
            meta_title: 'Password dimenticata',
            success: 'Ti abbiamo inviato un\'e-mail per reimpostare la password. Controlla la tua casella di posta per continuare.',
            title: 'Hai dimenticato la password?',
        },
        log_out: 'Esci',
        reset_password: {
            default: 'Reimposta password',
            description: 'Scegli una password complessa per proteggere il tuo account.',
            title: 'Crea una nuova password',
        },
        sign_up: {
            default: 'Registrati',
            description: 'Hai già un account?',
            error: 'Email già utilizzata',
            submit: 'Crea un account',
            success: 'Ti abbiamo inviato un\'email di conferma. Controlla la tua casella di posta per attivare il tuo account.',
        },
        sing_in: {
            default: 'Accedi',
            description: 'Non hai un account?',
            password_hint: 'Password dimenticata?',
        },
    },
    empty: {
        athletes: {
            description: 'Sembra che non ci siano atleti che corrispondono ai tuoi criteri di ricerca.',
            title: 'Nessun atleta trovato',
        },
    },
    form: {
        activity: {
            label: 'Attività',
            placeholder: 'Seleziona un\'attività',
            required: 'L\'attività è obbligatoria',
        },
        confirm_password: {
            error: 'Le password non corrispondono',
            label: 'Conferma password',
            placeholder: 'Inserisci di nuovo la password',
            required: 'La conferma password è obbligatoria',
        },
        email: {
            error: 'L\'email non valida',
            label: 'Email',
            placeholder: 'Inserisci la tua email',
            required: 'L\'email è obbligatoria',
        },
        name: {
            error: 'Deve essere almeno di {min} caratteri',
            label: 'Nome',
            placeholder: 'Inserisci il nome',
            required: 'Il nome è obbligatorio',
        },
        password: {
            error: 'Deve essere almeno di {min} caratteri',
            label: 'Password',
            placeholder: 'Inserisci la tua password',
            required: 'La password è obbligatoria',
        },
        search: {
            placeholder: 'Cerca...',
            submit: 'Cerca',
        },
        season: {
            label: 'Stagione',
            placeholder: 'Seleziona una stagione',
            required: 'La stagione è obbligatoria',
        },
    },
    menu: {
        certificates: 'Certificati',
        contacts: 'Contatti',
        payments: 'Pagamenti',
        personal_data: 'Anagrafica',
    },
    page: {
        athletes: {
            title: 'Anagrafica',
        },
        home: {
            card: {
                certificates: {
                    description: 'Controlla rapidamente lo stato di validità dei certificati medici degli atleti.',
                    title: 'Certificati',
                },
                contacts: {
                    description: 'Accedi ai recapiti degli atleti, con numeri di cellulare e indirizzi email.',
                    title: 'Contatti',
                },
                payments: {
                    description: 'Consulta la lista degli atleti con lo stato e i dettagli dei pagamenti effettuati.',
                    title: 'Pagamenti',
                },
                personal_data: {
                    description: 'Visualizza l\'elenco completo degli atleti iscritti.',
                    title: 'Anagrafica',
                },
            },
            hero: {
                description: 'Smart Volley permette di consultare e gestire in modo semplice e sicuro i dati degli atleti iscritti. Consente di visualizzare informazioni anagrafiche, lo stato dei pagamenti e la validità del certificato medico',
                head_line: 'Smart Volley',
                title: 'Gestione atleti',
            },
        },
    },
    table: {
        athletes: {
            columns: {
                activity: 'Attività',
                certificate_download_url: 'Download certificato',
                certificate_expiration_date: {
                    label: 'Scadenza certificato',
                    status: {
                        expired: 'Scaduto',
                        missing: 'Mancante',
                        valid: 'Valido',
                    },
                },
                email: 'Email',
                fist_installment: 'Prima rata',
                name: 'Nome',
                phone_number: 'Numero di cellulare',
                season: 'Stagione',
                second_installment: 'Seconda rata',
                third_installment: 'Terza rata',
                volley_account: 'Account volley',
                volley_balance: 'Saldo volley',
                volley_balance_secondary: 'Saldo volley 2',
            },
            empty: 'Nessun atleta trovato',
            form: {
                search: {
                    placeholder: 'Cerca atleta...',
                },
            },
        },
    },
    toast: {
        clipboard: '{name} copiato negli appunti',
    },
} as const;

type LeafKeyOf<T extends object> = {
    [K in keyof T & string]:
    T[K] extends object
        ? `${K}.${LeafKeyOf<T[K]>}`
        : `${K}`
}[keyof T & string];

type ExtractParams<S extends string>
    = S extends `${string}{${infer Param}}${infer Rest}`
        ? Param | ExtractParams<Rest>
        : never;

type ParamsObject<S extends string>
    = ExtractParams<S> extends never
        ? undefined
        : Record<ExtractParams<S>, string | number>;

type PathValue<T, P extends string>
    = P extends `${infer K}.${infer Rest}`
        ? K extends keyof T
            ? PathValue<T[K], Rest>
            : never
        : P extends keyof T
            ? T[P]
            : never;

type I18nKey = LeafKeyOf<typeof i18n>;
type TranslationValue<K extends I18nKey> = PathValue<typeof i18n, K>;

export function $t<K extends I18nKey>(key: K, ...args: ParamsObject<TranslationValue<K>> extends undefined ? [] : [params: ParamsObject<TranslationValue<K>>]) {
    const value = key.split('.').reduce<unknown>((acc, key) => {
        if (typeof acc === 'object' && acc !== null && key in acc) {
            return (acc as Record<string, unknown>)[key];
        }

        return '';
    }, i18n as Record<string, unknown>) as string;

    const params = args[0];

    if (params) {
        return Object.entries(params).reduce((acc, [key, value]) => acc.replace(new RegExp(`{${key}}`, 'g'), String(value)), value);
    }

    return value;
}
