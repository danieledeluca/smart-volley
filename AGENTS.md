# Progetto Smart Volley - Guida Agente AI

## Descrizione

Piattaforma di gestione per l'associazione sportiva "Vis et Virtus": iscrizioni, anagrafica (atleti/genitori), pagamenti e certificati medici.

## Stack Tecnologico

- **Framework**: Nuxt 4, Vue 3, TypeScript.
- **Database**: PostgreSQL (Neon), Drizzle ORM.
- **Autenticazione**: Better Auth (Google OAuth).
- **Storage**: Cloudflare R2 (certificati).
- **UI**: Nuxt UI, Tailwind CSS 4.
- **Validazione**: Zod, `drizzle-zod`.

## Struttura Directory

- `app/`: Frontend (pages, components, stores, composables).
- `server/`: API (Nitro), middleware.
- `lib/db/`: Schema, query, migrazioni, seed.
- `lib/storage/`: R2 (upload, ottimiz. PDF).
- `shared/utils/`: Codice condiviso (i18n, Zod schemas).

## Database & Relazioni

- Schema in `lib/db/schema/`.
- Relazioni:
  - `athlete` ↔ `parent` (one-to-many).
  - `athlete` ↔ `enrollment` (one-to-many).
  - `season`/`course` ↔ `enrollment` (one-to-many).
  - `activity` ↔ `course` (one-to-many).

## Autorizzazioni & Ruoli

Definiti in `lib/db/schema/auth.ts`: `admin`, `manager`, `viewer`.

- `admin`: Accesso totale (incluso `/dashboard/settings/`).
- `manager`: CRUD dati (atleti, iscrizioni, stagioni, corsi, attività).
- `viewer`: Solo lettura.

## Gestione Certificati (R2)

Logica in `lib/storage/`:

- Upload: `optimizeAndConvertToPdf` (ottimizzazione immagini/PDF).
- Accesso: `getSignedFileUrl` (URL firmati validi 10 min).

## API & Validazione

- **API Authenticate**: Usare `defineAuthenticatedEventHandler` (con opzione `roles` per restrizioni).
- **API Pubbliche**: Endpoint rari (es. home), definire con `defineEventHandler` standard.
- **Autorizzazioni**: Nelle API di scrittura, verificare sempre il ruolo utente tramite `defineAuthenticatedEventHandler({ roles: ['admin', 'manager'] })`.
- **Validazione**: Zod (usare `readValidatedBody`, `getValidatedQuery`, `getValidatedRouterParams`).
- **Errori**: `sendZodError`, `sendDbError` (server-side), `getFetchErrorMessage` (client-side).

## Internazionalizzazione (i18n)

- Traduzioni in `shared/utils/translations.ts`.
- Utilizzo in componenti/pagine: `$t('key.path')`.

## Sviluppo

- `npm run dev`: Dev server.
- `npm run build`: Build produzione.
- `npm run lint` / `lint:fix`: ESLint.
- `npm run typecheck`: TypeScript.
- `npm run db:generate` / `db:migrate` / `db:seed`: Drizzle.
- `npm run db:studio`: Interfaccia DB.

## Regole Operative

- Nuove componenti: Seguire pattern in `app/components/` (stile, Props, UComponent tags).
- API: Usare `defineAuthenticatedEventHandler`. Endpoint pubblici sono rari (es. home).
- Non modificare segreti o `lib/env.ts`.
- Non introdurre dipendenze senza necessità.
- Riutilizzare composable, utility e componenti esistenti; evitare duplicazione di logica.
- Eseguire lint e typecheck dopo le modifiche.
- Non modificare le migrazioni già applicate senza ragioni esplicite.
