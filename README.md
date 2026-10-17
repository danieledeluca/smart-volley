# Smart Volley

Management platform for the **Vis et Virtus** sports club. Handles athlete registration, enrollments, payments, and medical certificate tracking.

## Features

- **Athletes & parents**: full CRUD, Google Places address autocomplete, Italian fiscal code validation, auto-generated avatars (Jdenticon, rendered locally, no external service).
- **Seasons, activities & courses**: seasons are `startYear/endYear` pairs. Activities are configurable (name + [Lucide](https://lucide.dev/) icon, stored as `i-lucide-<name>`). Each course belongs to an activity.
- **Enrollments**: link an athlete to a season and a course. Up to three payments per enrollment (amount, date, cash/bank transfer).
- **Medical certificates**: upload PNG/JPG/WebP/PDF (max 3 MB). Images are converted to A4 PDFs, PDFs are validated and stored as-is in Cloudflare R2. Downloads use presigned URLs valid for 10 minutes. A new enrollment without certificate data inherits the athlete's latest certificate from a previous season.
- **Dashboard**: per activity, for the selected season: enrollments and payments with variation against the previous season, certificates expiring in 30 days, all-time totals. Aggregated server-side with a single `GROUP BY` query.
- **Filtering**: enrollments by season, activity, course and certificate status (synced with the URL query). Lists have a global text filter.
- **Bulk operations**: multi-select delete for athletes, parents and enrollments. CSV export of enrollments (`;` separated, UTF-8 with BOM, Excel-friendly).
- **Authentication**: Google OAuth via Better Auth with role-based access.

### Roles

| Role      | Access                                                                          |
| --------- | ------------------------------------------------------------------------------- |
| `admin`   | Everything, plus user management (`/dashboard/settings`)                        |
| `manager` | Read and write all data, including seasons, activities and courses              |
| `viewer`  | Read-only. No access to seasons, activities and courses pages                   |
| _none_    | Just signed up: waits for an admin to assign a role, no access to the dashboard |

## Tech Stack

| Layer      | Technology                                    |
| ---------- | --------------------------------------------- |
| Framework  | Nuxt 4, Vue 3, TypeScript                     |
| UI         | Nuxt UI, Tailwind CSS 4, Lucide icons         |
| State      | Pinia                                         |
| Tables     | TanStack Vue Table                            |
| Auth       | Better Auth (Google OAuth)                    |
| Database   | PostgreSQL (Neon), Drizzle ORM                |
| Storage    | Cloudflare R2 (S3-compatible), sharp, pdf-lib |
| Maps       | Google Places (address autocomplete)          |
| Validation | Zod, drizzle-zod                              |

## Getting Started

### Prerequisites

- Node.js **22.19+** (required by Nuxt 4.5)
- A PostgreSQL database (e.g. [Neon](https://neon.tech))
- A Google Cloud project with:
    - OAuth 2.0 credentials. Authorized redirect URI: `<BETTER_AUTH_URL>/api/auth/callback/google`
    - A Maps JavaScript API key with the Places API enabled. The key is exposed to the browser, so **restrict it by HTTP referrer and by API**.
- A Cloudflare R2 bucket for certificate storage

### Setup

```bash
git clone <repo-url>
cd smart-volley
npm install
cp .env.example .env
```

Fill in `.env` (see below), then:

```bash
npm run db:migrate   # Apply migrations
npm run dev          # Start dev server
```

### First admin

New users are created without a role. After your first sign-in, promote yourself directly in the database:

```sql
UPDATE "user" SET role = 'admin' WHERE email = 'you@example.com';
```

From then on, roles are managed from **Settings → Users**.

### Environment Variables

| Variable               | Description                                 |
| ---------------------- | ------------------------------------------- |
| `NODE_ENV`             | `development` or `production`               |
| `DATABASE_URL`         | PostgreSQL connection string                |
| `BETTER_AUTH_SECRET`   | Secret for session signing                  |
| `BETTER_AUTH_URL`      | App base URL (e.g. `http://localhost:3000`) |
| `GOOGLE_CLIENT_ID`     | Google OAuth client ID                      |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret                  |
| `GOOGLE_MAPS_API_KEY`  | Google Maps/Places API key                  |
| `R2_ACCOUNT_ID`        | Cloudflare account ID                       |
| `R2_ACCESS_KEY_ID`     | R2 access key                               |
| `R2_SECRET_ACCESS_KEY` | R2 secret key                               |
| `R2_BUCKET_NAME`       | R2 bucket name                              |

## Scripts

| Command               | Description                                                       |
| --------------------- | ----------------------------------------------------------------- |
| `npm run dev`         | Start dev server                                                  |
| `npm run build`       | Production build                                                  |
| `npm run preview`     | Preview production build                                          |
| `npm run lint`        | Run ESLint                                                        |
| `npm run lint:fix`    | Run ESLint with auto-fix                                          |
| `npm run typecheck`   | TypeScript type checking                                          |
| `npm run db:generate` | Generate a Drizzle migration from schema changes                  |
| `npm run db:migrate`  | Apply pending migrations                                          |
| `npm run db:studio`   | Open Drizzle Studio                                               |
| `npm run db:seed`     | Fill the database with fake data. **Deletes existing data first** |

> `db:seed` empties the athlete, parent, enrollment, season, course and activity tables. Never run it against a production database.

## Database Changes

1. Edit the schema in `lib/db/schema/`.
2. Run `npm run db:generate` and **review the generated SQL** in `lib/db/migrations/`. Add backfills by hand when needed, for example before turning a column into `NOT NULL`.
3. Run `npm run db:migrate`.

Deletions are permanent (no soft delete). Deleting an athlete cascades to their enrollments.

## Project Structure

```
app/            Nuxt app: pages, components, composables, stores, utils
server/         API routes (server/api), middleware, helpers
lib/db/         Drizzle schema, queries, migrations, seed
lib/storage/    R2 client, upload/optimization of certificates
lib/utils/      Constants and helpers shared by app and server
shared/utils/   Code shared by client and server (i18n, zod schemas, translations)
public/         Static assets
```

Conventions:

- Texts live in `shared/utils/translations.ts` and are used through `$t('some.key')`.
- API handlers are wrapped in `defineAuthenticatedEventHandler`, optionally restricted with `roles`.
- Lists (athletes, parents, seasons, activities, courses, enrollments) are cached in Pinia stores. Detail pages fetch their own data.
- Code style is enforced by ESLint (`@antfu/eslint-config`) and a pre-commit hook via `lint-staged`.

## Deployment

The project is designed for Vercel. The `vercel-build` script runs `db:migrate` automatically on production deployments (`VERCEL_ENV=production`) before building, so migrations must be safe to run on existing data.

## License

[MIT](LICENSE)
