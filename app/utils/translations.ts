/* eslint-disable style/max-len */
export const translations = {
    auth: {
        forgot_password: {
            description: 'Inserisci la tua email e ti invieremo un link di recupero.',
            meta_title: 'Password dimenticata',
            submit: 'Reimposta password',
            success: 'Ti abbiamo inviato un\'e-mail per reimpostare la password. Controlla la tua casella di posta per continuare.',
            title: 'Hai dimenticato la password?',
        },
        log_out: 'Esci',
        reset_password: {
            description: 'Scegli una password complessa per proteggere il tuo account.',
            meta_title: 'Reimposta password',
            submit: 'Reimposta password',
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
            error: {
                invalid_credentials: 'Email o password non validi',
            },
        },
    },
    card: {
        address_contacts: {
            title: 'Indirizzo e contatti',
        },
        athlete: {
            title: 'Atleta',
        },
        enrollments: {
            title: 'Iscrizioni',
        },
        parent: {
            title: 'Genitore',
        },
        payments: {
            title: 'Pagamenti',
        },
        record: {
            account_volley: 'Account volley',
            activity: 'Attività',
            address: 'Indirizzo',
            birthday: 'Data di nascita',
            birthplace: 'Luogo di nascita',
            certificates: {
                download_url: 'Download certificato',
                expiration_date: 'Scadenza certificato',
            },
            city: 'Città',
            course: 'Corso',
            email: 'Email',
            first_installment: 'Prima rata',
            name: 'Nome',
            parent: {
                email: 'Email genitore',
                name: 'Nome genitore',
                tax_code: 'Codice fiscale genitore',
            },
            phone_number: 'Numero di cellulare',
            season: 'Stagione',
            second_installment: 'Seconda rata',
            tax_code: 'Codice fiscale',
            third_installment: 'Terza rata',
            volley_balance: 'Saldo volley',
            volley_balance_secondary: 'Saldo volley 2',
        },
        sport: {
            title: 'Sport',
        },
    },
    form: {
        activity: {
            label: 'Attività',
            placeholder: 'Seleziona un\'attività',
        },
        confirm_password: {
            error: 'Le password non corrispondono',
            label: 'Conferma password',
            placeholder: 'Inserisci di nuovo la password',
            required: 'La conferma password è obbligatoria',
        },
        course: {
            label: 'Corso',
            placeholder: 'Seleziona un corso',
        },
        email: {
            error: 'L\'email non valida',
            label: 'Email',
            placeholder: 'Inserisci la tua email',
            required: 'L\'email è obbligatoria',
        },
        name: {
            label: 'Nome',
            placeholder: 'Inserisci il nome',
        },
        password: {
            error: 'Deve essere almeno di {min} caratteri',
            label: 'Password',
            placeholder: 'Inserisci la tua password',
            required: 'La password è obbligatoria',
        },
        search: {
            submit: 'Cerca',
        },
        season: {
            label: 'Stagione',
            placeholder: 'Seleziona una stagione',
        },
    },
    menu: {
        athletes: 'Atleti',
        certificates: 'Certificati medici',
        enrollments: 'Iscrizioni',
        payments: 'Pagamenti',
    },
    page: {
        athlete: {
            title: 'Dettagli atleta',
        },
        athletes: {
            header: {
                description: 'Una panoramica completa di tutti gli atleti iscritti alla società, con informazioni di contatto sempre aggiornate, come numero di cellulare ed email, per restare facilmente in contatto e gestire ogni esigenza della squadra.',
                title: 'Elenco atleti',
            },
            title: 'Anagrafica',
        },
        certificates: {
            header: {
                description: 'Controlla rapidamente lo stato dei certificati medici degli atleti, con informazioni sulla data di scadenza e link diretti per scaricare i documenti, assicurando la regolarità di tutte le iscrizioni.',
                title: 'Certificati medici',
            },
            title: 'Certificati medici',
        },
        enrollment: {
            button: 'Vedi scheda atleta',
            title: 'Dettagli iscrizione',
        },
        enrollments: {
            header: {
                description: 'Tutte le iscrizioni degli atleti in un unico posto: consulta le stagioni di partecipazione, le attività e i corsi assegnati, per avere sotto controllo la partecipazione e la pianificazione delle squadre.',
                title: 'Dettagli iscrizioni',
            },
            title: 'Iscrizioni',
        },
        home: {
            card: {
                athletes: {
                    description: 'Consulta la lista completa degli atleti iscritti.',
                    title: 'Anagrafica',
                },
                certificates: {
                    description: 'Consulta lo stato di validità dei certificati medici degli atleti.',
                    title: 'Certificati',
                },
                enrollments: {
                    description: 'Consulta la lista completa delle iscrizioni degli atleti.',
                    title: 'Iscrizioni',
                },
                payments: {
                    description: 'Consulta la lista degli atleti con i dettagli dei pagamenti effettuati.',
                    title: 'Pagamenti',
                },
            },
            hero: {
                description: 'Smart Volley permette di consultare e gestire in modo semplice e sicuro i dati degli atleti iscritti. Consente di visualizzare informazioni anagrafiche, lo stato dei pagamenti e la validità del certificato medico.',
                head_line: 'Smart Volley',
                title: 'Atleti della Vis et Virtus',
            },
        },
        payments: {
            header: {
                description: 'Gestisci e controlla lo storico dei pagamenti delle iscrizioni, con dettagli sui saldi, le scadenze e le transazioni, per avere sempre una visione chiara delle finanze della società.',
                title: 'Pagamenti e saldi',
            },
            title: 'Pagamenti',
        },
    },
    table: {
        column: {
            activity: 'Attività',
            certificate: {
                download_url: {
                    button: 'Download',
                    label: 'Download certificato',
                },
                expiration_date: {
                    label: 'Scadenza certificato',
                    status: {
                        expired: 'Scaduto',
                        missing: 'Mancante',
                        valid: 'Valido',
                    },
                },
            },
            course: 'Corso',
            email: 'Email',
            first_installment: 'Prima rata',
            id: 'ID',
            name: 'Nome',
            phone_number: 'Numero di cellulare',
            season: 'Stagione',
            second_installment: 'Seconda rata',
            third_installment: 'Terza rata',
            volley_account: 'Account volley',
            volley_balance: 'Saldo volley',
            volley_balance_secondary: 'Saldo volley 2',
        },
        empty: 'Nessun risultato trovato',
        pagination: 'Visualizzati {start}-{end} di {total}',
    },
    toast: {
        clipboard: '{name} copiato negli appunti',
    },
} as const;

export type Translations = typeof translations;
