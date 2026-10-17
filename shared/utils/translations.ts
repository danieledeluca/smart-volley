/* eslint-disable style/max-len */
export const translations = {
    action: {
        copy_id: {
            label: 'Copia ID',
            success: 'ID',
        },
        delete: 'Elimina',
        download_csv: 'Download CSV',
        edit: 'Modifica',
        label: 'Azioni',
        view_details: 'Vedi dettagli',
    },
    auth: {
        role: {
            admin: 'Admin',
            manager: 'Gestore',
            viewer: 'Osservatore',
            waiting: 'In attesa...',
        },
        sign_in: {
            google: 'Accedi con Google',
        },
        sign_out: 'Esci',
    },
    card: {
        address_contacts: {
            record: {
                address: 'Indirizzo',
                email: 'Email',
                phone_number: 'Numero di cellulare',
            },
            title: 'Indirizzo e contatti',
        },
        certificate: {
            record: {
                download_url: 'Download certificato',
                expiration_date: 'Scadenza certificato',
            },
            title: 'Certificato medico',
        },
        children: {
            title: 'Figli',
        },
        dashboard: {
            enrollments: 'Iscrizioni',
            expiring_certificates: 'Certificati in scadenza',
            payments: 'Pagamenti',
            total_enrollments: 'Totale iscrizioni',
            total_payments: 'Totale pagamenti',
        },
        enrollments: {
            title: 'Iscrizioni',
        },
        parent: {
            record: {
                email: 'Email genitore',
                fiscal_code: 'Codice fiscale genitore',
                name: 'Cognome e nome genitore',
                phone_number: 'Numero di cellulare genitore',
            },
            title: 'Informazioni genitore',
        },
        payments: {
            title: 'Pagamenti',
        },
        personal_information: {
            record: {
                birthdate: 'Data di nascita',
                birthplace: 'Luogo di nascita',
                fiscal_code: 'Codice fiscale',
                name: 'Cognome e nome',
            },
            title: 'Informazioni personali',
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
    error: {
        conflict: 'The request could not be completed due to a conflict with the current state of the resource.',
        forbidden: 'You don\'t have permission to access this resource',
        generic: 'An unexpected error occurred. Please try again later.',
        unauthorized: 'You are not authenticated. Please log in to continue.',
        unprocessable_content: 'The request was understood, but the provided data is invalid.',
    },
    form: {
        activity: {
            add: {
                description: 'Compila i campi per creare una nuova attività.',
                success: 'Attività aggiunta con successo',
                title: 'Nuova attività',
            },
            edit: {
                description: 'Compila i campi per modificare le informazioni dell\'attività.',
                success: 'Attività modificata con successo',
                title: 'Modifica attività',
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
                description: 'Sei sicuro? Questa azione è irreversibile.',
                success: 'Atleta eliminato con successo',
                title: 'Elimina atleta',
            },
            edit: {
                description: 'Compila i campi per modificare le informazioni dell\'atleta.',
                success: 'Atleta modificato con successo',
                title: 'Modifica atleta',
            },
            multiple_delete: {
                description: 'Sei sicuro? Questa azione è irreversibile.',
                success: 'Atleti eliminati con successo',
                title: 'Elimina {quantity} atleti',
            },
        },
        button: {
            add: 'Aggiungi',
            cancel: 'Annulla',
            delete: 'Elimina',
            download: 'Download',
            edit: 'Modifica',
        },
        course: {
            add: {
                description: 'Compila i campi per creare un nuovo corso.',
                group: {
                    activity: 'Attività',
                },
                success: 'Corso aggiunto con successo',
                title: 'Nuovo corso',
            },
            edit: {
                description: 'Compila i campi per modificare le informazioni del corso.',
                success: 'Corso modificato con successo',
                title: 'Modifica corso',
            },
        },
        enrollment: {
            add: {
                description: 'Compila i campi per creare una nuova iscrizione.',
                group: {
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
                description: 'Sei sicuro? Questa azione è irreversibile.',
                success: 'Iscrizione eliminata con successo',
                title: 'Elimina iscrizione',
            },
            download_csv: {
                success: 'CSV scaricato con successo',
            },
            edit: {
                description: 'Compila i campi per modificare le informazioni dell\'iscrizione.',
                success: 'Iscrizione modificata con successo',
                title: 'Modifica iscrizione',
            },
            multiple_delete: {
                description: 'Sei sicuro? Questa azione è irreversibile.',
                success: 'Iscrizioni eliminate con successo',
                title: 'Elimina {quantity} iscrizioni',
            },
        },
        field: {
            activity_icon: {
                error: 'L\'icona non esiste nella libreria Lucide',
                help: 'Scegli un\'icona dalla libreria Lucide. A destra vedi l\'anteprima.',
                label: 'Icona',
                placeholder: 'volleyball',
                required: 'L\'icona è obbligatoria',
            },
            activity_id: {
                label: 'Attività',
                not_found: 'Attività non trovata',
                required: 'L\'attività è obbligatoria',
            },
            activity_name: {
                duplicate: 'L\'attività esiste già',
                label: 'Nome',
                placeholder: 'Inserisci il nome',
                required: 'Il nome è obbligatorio',
            },
            address: {
                label: 'Indirizzo',
                placeholder: 'Inserisci l\'indirizzo',
                required: 'L\'indirizzo è obbligatorio',
                valid: 'Seleziona un indirizzo valido',
            },
            athlete_id: {
                not_found: 'Atleta non trovato',
                placeholder: 'Seleziona un atleta',
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
                valid: 'Seleziona un indirizzo valido',
            },
            certificate_expiration_date: {
                help: 'Se data di scadenza e file restano vuoti, verranno usati quelli dell\'ultima iscrizione.',
                label: 'Data di scadenza',
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
                help: 'L\'anteprima di un certificato già caricato non è disponibile. Per sostituirlo, elimina prima il file esistente.',
            },
            course_code: {
                duplicate: 'Il corso esiste già',
                label: 'Codice',
                placeholder: 'Inserisci il codice',
                required: 'Il codice è obbligatorio',
            },
            course_id: {
                label: 'Corso',
                not_found: 'Corso non trovato',
                placeholder: 'Seleziona un corso',
                required: 'Il corso è obbligatorio',
            },
            course_name: {
                label: 'Nome',
                placeholder: 'Inserisci il nome',
                required: 'Il nome è obbligatorio',
            },
            email: {
                duplicate: 'L\'email esiste già',
                error: 'L\'email non è valida',
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
                duplicate: 'L\'iscrizione per questo/a atleta, stagione e corso esiste già',
            },
            file_upload: {
                button: {
                    label: 'Seleziona file',
                },
                label: 'Trascina il file qui',
            },
            first_payment: {
                label: 'Primo pagamento',
            },
            fiscal_code: {
                duplicate: 'Il codice fiscale esiste già',
                error: 'Il codice fiscale non è valido',
                label: 'Codice fiscale',
                placeholder: 'Inserisci il codice fiscale',
                required: 'Il codice fiscale è obbligatorio',
            },
            name: {
                label: 'Cognome e nome',
                placeholder: 'Inserisci il cognome e il nome',
                required: 'Il cognome e il nome sono obbligatori',
            },
            parent_id: {
                not_found: 'Genitore non trovato',
                placeholder: 'Seleziona un genitore',
            },
            payment_amount: {
                placeholder: 'Inserisci l\'importo',
            },
            payment_date: {
                label: 'Data del pagamento',
            },
            payment_type: {
                item: {
                    bank_transfer: 'Bonifico',
                    cash: 'Contanti',
                },
                label: 'Tipologia di pagamento',
                placeholder: 'Seleziona una tipologia di pagamento',
            },
            phone_number: {
                duplicate: 'Il numero di cellulare esiste già',
                error: 'Il numero di cellulare non è valido',
                label: 'Numero di cellulare',
                placeholder: 'Inserisci il numero di cellulare',
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
            second_payment: {
                label: 'Secondo pagamento',
            },
            start_year: {
                label: 'Anno di inizio',
                placeholder: 'Inserisci l\'anno di inizio',
                required: 'L\'anno di inizio è obbligatorio',
            },
            third_payment: {
                label: 'Terzo pagamento',
            },
            user_role: {
                item: {
                    admin: 'Admin',
                    manager: 'Gestore',
                    viewer: 'Osservatore',
                },
                placeholder: 'Seleziona un ruolo',
            },
        },
        filter: {
            button: {
                apply: 'Applica',
                clear: 'Cancella tutto',
                open: 'Filtri',
            },
            description: 'Applica i filtri per restringere i risultati.',
            group: {
                certificate: 'Certificato',
            },
            title: 'Filtri',
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
                description: 'Sei sicuro? Questa azione è irreversibile.',
                success: 'Genitore eliminato con successo',
                title: 'Elimina genitore',
            },
            edit: {
                description: 'Compila i campi per modificare le informazioni del genitore.',
                success: 'Genitore modificato con successo',
                title: 'Modifica genitore',
            },
            multiple_delete: {
                description: 'Sei sicuro? Questa azione è irreversibile.',
                success: 'Genitori eliminati con successo',
                title: 'Elimina {quantity} genitori',
            },
        },
        season: {
            add: {
                description: 'Compila i campi per creare una nuova stagione.',
                success: 'Stagione aggiunta con successo',
                title: 'Nuova stagione',
            },
            edit: {
                description: 'Compila i campi per modificare le informazioni della stagione.',
                success: 'Stagione modificata con successo',
                title: 'Modifica stagione',
            },
        },
        tooltip: {
            delete: 'Seleziona almeno una riga',
        },
        user_role: {
            edit: {
                success: 'Ruolo utente aggiornato con successo',
            },
        },
        warning: {
            no_data: 'Nessun dato',
        },
    },
    menu: {
        activities: 'Attività',
        athletes: 'Atleti',
        certificates: 'Certificati medici',
        courses: 'Corsi',
        dashboard: 'Dashboard',
        enrollments: 'Iscrizioni',
        parents: 'Genitori',
        payments: 'Pagamenti',
        seasons: 'Stagioni',
        settings: {
            label: 'Impostazioni',
            users: 'Utenti',
        },
    },
    page: {
        activities: {
            button: {
                add: 'Nuova attività',
            },
            title: 'Attività',
        },
        activity: {
            error: 'Attività non trovata',
        },
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
        course: {
            error: 'Corso non trovato',
        },
        courses: {
            button: {
                add: 'Nuovo corso',
            },
            title: 'Corsi',
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
        error: {
            no_data: {
                description: 'La pagina sembra essere vuota',
                title: 'Nessun contenuto trovato',
            },
        },
        home: {
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
                button: {
                    dashboard: 'Dashboard',
                    waiting: 'In attesa di approvazione',
                },
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
        parent: {
            button: {
                back: 'Lista genitori',
            },
            error: 'Genitore non trovato',
            title: 'Dettagli genitore',
        },
        parents: {
            button: {
                add: 'Nuovo genitore',
            },
            title: 'Genitori',
        },
        payments: {
            title: 'Pagamenti',
        },
        season: {
            error: 'Stagione non trovata',
        },
        seasons: {
            button: {
                add: 'Nuova stagione',
            },
            title: 'Stagioni',
        },
        settings: {
            users: {
                card: {
                    description: 'Assegna un ruolo a chi si è registrato o rimuovi l\'accesso',
                    title: 'Utenti',
                },
                filter: {
                    placeholder: 'Cerca utenti',
                },
                no_data: 'Nessun risultato trovato per: {name}',
                title: 'Utenti',
            },
        },
        user: {
            error: {
                not_able: 'Non puoi modificare il tuo ruolo',
                not_found: 'Utente non trovato',
            },
        },
    },
    table: {
        column: {
            activity: 'Attività',
            athlete: 'Atleta',
            certificate_download_url: 'Download certificato',
            certificate_expiration_date: 'Scadenza certificato',
            code: 'Codice',
            course: 'Corso',
            email: 'Email',
            end_year: 'Anno di fine',
            first_payment: 'Primo pagamento',
            fiscal_code: 'Codice fiscale',
            icon: 'Icona',
            id: 'ID',
            name: 'Nome',
            payment_amount: 'Importo',
            payment_date: 'Data',
            payment_name: 'Nome',
            payment_type: 'Tipologia',
            phone_number: 'Numero di cellulare',
            season: 'Stagione',
            second_payment: 'Secondo pagamento',
            start_year: 'Anno di inizio',
            third_payment: 'Terzo pagamento',
        },
        global_filter: {
            placeholder: 'Filtra...',
        },
        pagination: 'Visualizzati {start}-{end} di {total}',
        row_selected: '{selected} di {total} righe selezionate',
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
