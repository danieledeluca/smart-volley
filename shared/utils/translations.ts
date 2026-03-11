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
            description: 'Hai già un account?',
            error: 'Email già utilizzata',
            submit: 'Crea un account',
            success: 'Ti abbiamo inviato un\'email di conferma. Controlla la tua casella di posta per attivare il tuo account.',
            title: 'Registrati',
        },
        sing_in: {
            description: 'Non hai un account?',
            error: {
                invalid_credentials: 'Email o password non validi',
            },
            password_hint: 'Password dimenticata?',
            title: 'Accedi',
        },
    },
    card: {
        address_contacts: {
            title: 'Indirizzo e contatti',
        },
        athlete: {
            title: 'Informazioni personali',
        },
        enrollments: {
            title: 'Iscrizioni',
        },
        parent: {
            title: 'Informazioni genitore',
        },
        payments: {
            title: 'Pagamenti',
        },
        record: {
            account_volley: 'Acconto volley',
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
            name: 'Nome e cognome',
            parent: {
                email: 'Email genitore',
                name: 'Nome genitore',
                phone_number: 'Numero cellulare genitore',
                tax_code: 'Codice fiscale genitore',
            },
            phone_number: 'Numero cellulare',
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
        add_athlete: {
            button: {
                add_parent: 'Nuovo genitore',
            },
            group: {
                parent_information: 'Informazioni genitore',
                personal_information: 'Informazioni personali',
            },
            success: 'Atleta aggiunto con successo',
            title: 'Aggiungi nuovo atleta',
        },
        add_parent: {
            success: 'Genitore aggiunto con successo',
            title: 'Aggiungi nuovo genitore',
        },
        button: {
            add: 'Aggiungi',
        },
        field: {
            activity: {
                label: 'Attività',
                placeholder: 'Seleziona un\'attività',
            },
            address: {
                label: 'Indirizzo',
                placeholder: 'Inserisci l\'indirizzo',
                required: 'L\'indirizzo è obbligatorio',
            },
            birthday: {
                error: 'La data di nascita deve essere nel passato',
                label: 'Data di nascita',
                required: 'La data di nascita è obbligatoria',
            },
            birthplace: {
                label: 'Luogo di nascita',
                placeholder: 'Inserisci il luogo di nascita',
                required: 'Il luogo di nascita è obbligatorio',
            },
            certificate_status: {
                item: {
                    expired: 'Scaduto',
                    missing: 'Mancante',
                    valid: 'Valido',
                },
                label: 'Certificato',
                placeholder: 'Seleziona uno stato',
            },
            city: {
                label: 'Città',
                placeholder: 'Inserisci la città',
                required: 'La città è obbligatoria',
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
                required: 'Il nome è obbligatorio',
            },
            parent: {
                label: 'Genitore',
                placeholder: 'Seleziona un genitore',
            },
            password: {
                error: 'Deve essere almeno di {min} caratteri',
                label: 'Password',
                placeholder: 'Inserisci la tua password',
                required: 'La password è obbligatoria',
            },
            payment: {
                item: {
                    first_installment: 'Prima rata',
                    second_installment: 'Seconda rata',
                    third_installment: 'Terza rata',
                    volley_account: 'Acconto volley',
                    volley_balance: 'Saldo volley',
                    volley_balance_secondary: 'Saldo volley 2',
                },
                label: 'Pagamenti',
                placeholder: 'Seleziona un pagamento',
            },
            phone_number: {
                label: 'Numero cellulare',
                placeholder: 'Inserisci il numero cellulare',
                required: 'Il numero cellulare è obbligatorio',
            },
            season: {
                label: 'Stagione',
                placeholder: 'Seleziona una stagione',
            },
            tax_code: {
                error: 'Il codice fiscale non è valido',
                label: 'Codice fiscale',
                placeholder: 'Inserisci il codice fiscale',
                required: 'Il codice fiscale è obbligatorio',
            },
        },
        filter: {
            button: {
                clear: 'Cancella tutto',
                open: 'Filtri',
            },
            title: 'Filtri',
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
            button: {
                back: 'Torna alla lista degli atleti',
            },
            error: 'Atleta non trovato',
            title: 'Dettagli atleta',
        },
        athletes: {
            button: {
                add: 'Aggiungi nuovo atleta',
            },
            header: {
                description: 'Una panoramica completa di tutti gli atleti iscritti alla società, con informazioni di contatto sempre aggiornate, come numero di cellulare ed email, per restare facilmente in contatto e gestire ogni esigenza della squadra.',
                title: 'Elenco atleti',
            },
            title: 'Atleti',
        },
        certificates: {
            header: {
                description: 'Controlla rapidamente lo stato dei certificati medici degli atleti, con informazioni sulla data di scadenza e link diretti per scaricare i documenti, assicurando la regolarità di tutte le iscrizioni.',
                title: 'Certificati medici',
            },
            title: 'Certificati medici',
        },
        enrollment: {
            button: {
                athlete: 'Vedi scheda atleta',
                back: 'Torna alla lista delle iscrizioni',
            },
            error: 'Iscrizione non trovata',
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
                    title: 'Atleti',
                },
                certificates: {
                    description: 'Consulta lo stato di validità dei certificati medici degli atleti.',
                    title: 'Certificati medici',
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
                description: 'Smart Volley permette di consultare e gestire in modo semplice e sicuro i dati degli atleti iscritti, lo stato dei pagamenti e la validità del certificato medico.',
                head_line: 'Smart Volley',
                title: 'Vis et Virtus',
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
            name: 'Nome e cognome',
            phone_number: 'Numero di cellulare',
            season: 'Stagione',
            second_installment: 'Seconda rata',
            third_installment: 'Terza rata',
            volley_account: 'Acconto volley',
            volley_balance: 'Saldo volley',
            volley_balance_secondary: 'Saldo volley 2',
        },
        pagination: 'Visualizzati {start}-{end} di {total}',
        sort: {
            asc: 'Ascendente',
            desc: 'Discendente',
        },
    },
    toast: {
        clipboard: '{name} copiato negli appunti',
    },
} as const;

export type Translations = typeof translations;
