/* eslint-disable style/max-len */
export const translations = {
    auth: {
        log_out: 'Esci',
        sign_up: {
            description: 'Hai già un account?',
            submit: 'Crea un account',
            title: 'Registrati',
        },
        sing_in: {
            description: 'Non hai un account?',
            password_hint: 'Password dimenticata?',
            title: 'Accedi',
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
        add_activity: {
            description: 'Compila i campi per creare una nuova attività.',
            success: 'Attività aggiunta con successo',
            title: 'Aggiungi nuova attività',
        },
        add_athlete: {
            description: 'Compila i campi per creare un nuovo atleta.',
            group: {
                address_contacts: 'Indirizzo e contatti',
                parent: 'Genitore',
                personal_information: 'Informazioni personali',
            },
            success: 'Atleta aggiunto con successo',
            title: 'Aggiungi nuovo atleta',
        },
        add_course: {
            description: 'Compila i campi per creare un nuovo corso.',
            success: 'Corso aggiunto con successo',
            title: 'Aggiungi nuovo corso',
        },
        add_enrollment: {
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
            title: 'Aggiungi nuova iscrizione',
        },
        add_parent: {
            description: 'Compila i campi per creare un nuovo genitore.',
            group: {
                contacts: 'Contatti',
                personal_information: 'Informazioni personali',
            },
            success: 'Genitore aggiunto con successo',
            title: 'Aggiungi nuovo genitore',
        },
        add_season: {
            description: 'Compila i campi per creare una nuova stagione.',
            success: 'Stagione aggiunta con successo',
            title: 'Aggiungi nuova stagione',
        },
        button: {
            add: 'Aggiungi',
            cancel: 'Annulla',
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
                label: 'Atleta',
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
                label: 'Data scadenza certificato',
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
                required: 'L\'email è obbligatoria',
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
                label: 'Genitore',
                not_found: 'Genitore non trovato',
                placeholder: 'Seleziona un genitore',
            },
            password: {
                error: 'Deve essere almeno di {min} caratteri',
                label: 'Password',
                placeholder: 'Inserisci la password',
                required: 'La password è obbligatoria',
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
            button: {
                add: 'Aggiungi nuova iscrizione',
            },
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
            athlete: 'Atleta',
            // TODO: refactor
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
