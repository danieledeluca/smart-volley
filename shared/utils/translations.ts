/* eslint-disable style/max-len */
export const translations = {
    auth: {
        role: {
            admin: 'Admin',
            manager: 'Gestore',
            viewer: 'Osservatore',
            waiting: 'In attesa',
        },
        sign_out: 'Esci',
        sing_in: {
            google: 'Accedi con Google',
        },
    },
    card: {
        address_contacts: {
            record: {
                address: 'Indirizzo',
                city: 'Città',
                email: 'Email',
                phone_number: 'Numero cellulare',
            },
            title: 'Indirizzo e contatti',
        },
        athlete: {
            record: {
                birthdate: 'Data di nascita',
                birthplace: 'Luogo di nascita',
                fiscal_code: 'Codice fiscale',
                name: 'Nome e cognome',
            },
            title: 'Informazioni personali',
        },
        certificate: {
            record: {
                download_url: 'Download certificato',
                expiration_date: 'Scadenza certificato',
            },
            title: 'Certificato medico',
        },
        enrollments: {
            title: 'Iscrizioni',
        },
        parent: {
            record: {
                email: 'Email genitore',
                fiscal_code: 'Codice fiscale genitore',
                name: 'Nome genitore',
                phone_number: 'Numero cellulare genitore',
            },
            title: 'Informazioni genitore',
        },
        payments: {
            record: {
                account_volley: 'Acconto volley',
                first_installment: 'Prima rata',
                second_installment: 'Seconda rata',
                third_installment: 'Terza rata',
                volley_balance: 'Saldo volley',
                volley_balance_secondary: 'Saldo volley 2',
            },
            title: 'Pagamenti',
        },
        sport: {
            record: {
                activity: 'Attività',
                course: 'Corso',
                season: 'Stagione',
            },
            title: 'Sport',
        },
    },
    form: {
        activity: {
            add: {
                description: 'Compila i campi per creare una nuova attività.',
                success: 'Attività aggiunta con successo',
                title: 'Nuova attività',
            },
        },
        athlete: {
            add: {
                description: 'Compila i campi per creare un nuovo atleta.',
                group: {
                    address_contacts: 'Indirizzo e contatti',
                    parent: 'Genitore',
                    personal_information: 'Informazioni personali',
                },
                success: 'Atleta aggiunto con successo',
                title: 'Nuovo atleta',
            },
            delete: {
                body: 'Sei sicuro di voler eliminare questo atleta? Questa azione è irreversibile.',
                description: 'Attenzione! Stai per eliminare un\'atleta.',
                success: 'Atleta eliminato con successo',
                title: 'Elimina atleta',
            },
            edit: {
                description: 'Compila i campi per modificare le informazioni dell\'atleta.',
                success: 'Atleta modificato con successo',
                title: 'Modifica atleta',
            },
        },
        course: {
            add: {
                description: 'Compila i campi per creare un nuovo corso.',
                success: 'Corso aggiunto con successo',
                title: 'Nuovo corso',
            },
        },
        enrollment: {
            add: {
                description: 'Compila i campi per creare una nuova iscrizione.',
                group: {
                    activity: 'Attività',
                    athlete: 'Atleta',
                    certificate: 'Certificato medico',
                    course: 'Corso',
                    payment_information: 'Informazioni di pagamento',
                    season: 'Stagione',
                },
                success: 'Iscrizione aggiunta con successo',
                title: 'Nuova iscrizione',
            },
            delete: {
                body: 'Sei sicuro di voler eliminare questa iscrizione? Questa azione è irreversibile.',
                description: 'Attenzione! Stai per eliminare un\'iscrizione.',
                success: 'Iscrizione eliminata con successo',
                title: 'Elimina iscrizione',
            },
            edit: {
                description: 'Compila i campi per modificare le informazioni dell\'iscrizione.',
                success: 'Iscrizione modificata con successo',
                title: 'Modifica iscrizione',
            },
        },
        parent: {
            add: {
                description: 'Compila i campi per creare un nuovo genitore.',
                group: {
                    contacts: 'Contatti',
                    personal_information: 'Informazioni personali',
                },
                success: 'Genitore aggiunto con successo',
                title: 'Nuovo genitore',
            },
            delete: {
                body: 'Sei sicuro di voler eliminare questo genitore? Questa azione è irreversibile.',
                description: 'Attenzione! Stai per eliminare un genitore.',
                success: 'Genitore eliminato con successo',
                title: 'Elimina genitore',
            },
            edit: {
                description: 'Compila i campi per modificare le informazioni del genitore.',
                success: 'Genitore modificato con successo',
                title: 'Modifica genitore',
            },
        },
        season: {
            add: {
                description: 'Compila i campi per creare una nuova stagione.',
                success: 'Stagione aggiunta con successo',
                title: 'Nuova stagione',
            },
        },
        button: {
            add: 'Aggiungi',
            cancel: 'Annulla',
            delete: 'Elimina',
            download: 'Download',
            edit: 'Modifica',
        },
        field: {
            activity_id: {
                label: 'Attività',
                not_found: 'Attività non trovata',
                placeholder: 'Seleziona un\'attività',
                required: 'L\'attività è obbligatoria',
            },
            activity_name: {
                duplicate: 'L\'attività esiste già',
                label: 'Nome attività',
                placeholder: 'Inserisci il nome dell\'attività',
                required: 'Il nome dell\'attività è obbligatoria',
            },
            address: {
                label: 'Indirizzo',
                placeholder: 'Inserisci l\'indirizzo',
                required: 'L\'indirizzo è obbligatorio',
            },
            athlete_id: {
                not_found: 'Atleta non trovato',
                placeholder: 'Seleziona un\'atleta',
                required: 'L\'atleta è obbligatorio',
            },
            birthdate: {
                error: 'La data di nascita deve essere nel passato',
                label: 'Data di nascita',
                required: 'La data di nascita è obbligatoria',
            },
            birthplace: {
                label: 'Luogo di nascita',
                placeholder: 'Inserisci il luogo di nascita',
                required: 'Il luogo di nascita è obbligatorio',
            },
            certificate_expiration_date: {
                label: 'Data scadenza',
            },
            certificate_status: {
                item: {
                    expired: 'Scaduto',
                    missing: 'Mancante',
                    valid: 'Valido',
                },
                label: 'Stato del certificato',
                placeholder: 'Seleziona uno stato',
            },
            certificate_storage_key: {
                description: 'PNG, JPG, WebP o PDF (max. {size})',
                error: {
                    not_found: 'Certificato non trovato',
                    size: 'Il file è troppo grande, scegli un file più piccolo di {size}',
                    type: 'Il file non è valido, scegli un file valido (PNG, JPG, WebP o PDF)',
                    upload: 'Errore nel caricamento del certificato',
                },
            },
            city: {
                label: 'Città',
                placeholder: 'Inserisci la città',
                required: 'La città è obbligatoria',
            },
            course_description: {
                label: 'Descrizione corso',
                placeholder: 'Inserisci la descrizione del corso',
            },
            course_id: {
                label: 'Corso',
                not_found: 'Corso non trovato',
                placeholder: 'Seleziona un corso',
                required: 'Il corso è obbligatorio',
            },
            course_name: {
                duplicate: 'Il corso esiste già',
                label: 'Nome corso',
                placeholder: 'Inserisci il nome del corso',
                required: 'Il nome del corso è obbligatorio',
            },
            email: {
                duplicate: 'L\'email esiste già',
                error: 'L\'email non valida',
                label: 'Email',
                placeholder: 'Inserisci l\'email',
            },
            end_year: {
                error: 'L\'anno di fine deve essere un anno dopo l\'anno di partenza',
                label: 'Anno di fine',
                placeholder: 'Inserisci l\'anno di fine',
                required: 'L\'anno di fine è obbligatorio',
            },
            enrollment: {
                duplicate: 'L\'iscrizione per questo/a atleta, stagione, attività e corso esiste già',
            },
            file_upload: {
                button: {
                    label: 'Seleziona file',
                },
                label: 'Trascina il file qui',
            },
            first_installment: {
                label: 'Prima rata',
                placeholder: 'Inserisci la prima rata',
            },
            fiscal_code: {
                duplicate: 'Il codice fiscale esiste già',
                error: 'Il codice fiscale non è valido',
                label: 'Codice fiscale',
                placeholder: 'Inserisci il codice fiscale',
                required: 'Il codice fiscale è obbligatorio',
            },
            missing_payment: {
                label: 'Pagamento mancante',
                placeholder: 'Seleziona un pagamento',
            },
            name: {
                label: 'Nome e cognome',
                placeholder: 'Inserisci il nome',
                required: 'Il nome è obbligatorio',
            },
            parent_id: {
                not_found: 'Genitore non trovato',
                placeholder: 'Seleziona un genitore',
            },
            phone_number: {
                duplicate: 'Il numero cellulare esiste già',
                error: 'Il numero cellulare non è valido',
                label: 'Numero cellulare',
                placeholder: 'Inserisci il numero cellulare',
                required: 'Il numero cellulare è obbligatorio',
            },
            season: {
                duplicate: 'La stagione per questo arco di tempo esiste già',
            },
            season_id: {
                label: 'Stagione',
                not_found: 'Stagione non trovata',
                placeholder: 'Seleziona una stagione',
                required: 'La stagione è obbligatoria',
            },
            second_installment: {
                label: 'Seconda rata',
                placeholder: 'Inserisci la seconda rata',
            },
            start_year: {
                label: 'Anno d\'inizio',
                placeholder: 'Inserisci l\'anno d\'inizio',
                required: 'L\'anno d\'inizio è obbligatorio',
            },
            third_installment: {
                label: 'Terza rata',
                placeholder: 'Inserisci la terza rata',
            },
            volley_account: {
                label: 'Acconto volley',
                placeholder: 'Inserisci l\'acconto volley',
            },
            volley_balance: {
                label: 'Saldo volley',
                placeholder: 'Inserisci il saldo volley',
            },
            volley_balance_secondary: {
                label: 'Saldo volley 2',
                placeholder: 'Inserisci il saldo volley 2',
            },
        },
        filter: {
            button: {
                apply: 'Applica',
                clear: 'Cancella tutto',
                open: 'Filtri',
            },
            description: 'Applica i filtri per restringere i risultati.',
            title: 'Filtri',
        },
    },
    menu: {
        athletes: 'Atleti',
        certificates: 'Certificati medici',
        dashboard: 'Dashboard',
        enrollments: 'Iscrizioni',
        payments: 'Pagamenti',
        parents: 'Genitori',
    },
    page: {
        athlete: {
            button: {
                back: 'Lista atleti',
            },
            error: 'Atleta non trovato',
            title: 'Dettagli atleta',
        },
        athletes: {
            button: {
                add: 'Nuovo atleta',
            },
            title: 'Atleti',
        },
        certificates: {
            title: 'Certificati medici',
        },
        dashboard: {
            title: 'Dashboard',
        },
        enrollment: {
            button: {
                back: 'Lista iscrizioni',
            },
            error: 'Iscrizione non trovata',
            title: 'Dettagli iscrizione',
        },
        enrollments: {
            button: {
                add: 'Nuova iscrizione',
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
                    description: 'Consulta lo stato dei pagamenti effettuati.',
                    title: 'Pagamenti',
                },
                tooltip: 'Accedi per vedere il contenuto',
            },
            feature: {
                manager: {
                    description: 'Può visualizzare e modificare tutti i dati',
                    title: 'Gestore',
                },
                viewer: {
                    description: 'Può visualizzare i dati senza apportare modifiche',
                    title: 'Osservatore',
                },
            },
            hero: {
                description: 'Smart Volley è la piattaforma digitale della società Vis et Virtus, pensata per semplificare la gestione degli atleti iscritti, tenere traccia delle iscrizioni e dei pagamenti, e monitorare la validità dei certificati medici.',
                head_line: 'Vis et Virtus',
                title: 'Smart Volley',
            },
            section: {
                description: '<p>Per accedere ai contenuti della piattaforma è necessario effettuare il login con il tuo account <strong>Google</strong>.</p><p>Dopo il primo accesso, il tuo account sarà in attesa di approvazione. L\'amministratore dovrà assegnarti un ruolo prima che tu possa visualizzare i contenuti.</p>',
                headline: 'Come funziona',
                title: 'Benvenuto su Smart Volley',
            },
        },
        payments: {
            title: 'Pagamenti',
        },
        parents: {
            title: 'Genitori',
            button: {
                add: 'Nuovo genitore',
            },
        },
        parent: {
            error: 'Genitore non trovato',
        },
    },
    table: {
        column: {
            activity: 'Attività',
            athlete: 'Atleta',
            certificate_download_url: 'Download certificato',
            certificate_expiration_date: 'Scadenza certificato',
            course: 'Corso',
            email: 'Email',
            first_installment: 'Prima rata',
            id: 'ID',
            name: 'Nome',
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
        copy: '{name} copiato negli appunti',
    },
} as const;

export type Translations = typeof translations;
