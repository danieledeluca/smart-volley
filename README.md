# Smart Volley

Management platform for the **Vis et Virtus** sports club. Handles athlete registration, enrollments, payments, and medical certificate tracking.

## Features

- **Athlete & parent management** — full CRUD with Google Places address autocomplete
- **Season & course management** — define seasons and courses tied to activity types (volleyball, gymnastics)
- **Enrollment tracking** — link athletes to seasons/courses with per-type payment fields (account, balance, installments) and payment type (cash/bank transfer)
- **Certificate management** — upload, store, and monitor medical certificate expiration dates (PDFs stored in Cloudflare R2)
- **Dashboard** — summary cards with enrollment stats, payment totals, and expiring certificates
- **Authentication** — Google OAuth via Better Auth with role-based access (admin, manager, viewer)
- **Filtering** — filter enrollments, athletes, and parents by multiple criteria
- **Bulk operations** — multi-select delete for athletes, parents, and enrollments

## Tech Stack

| Layer      | Technology                     |
| ---------- | ------------------------------ |
| Framework  | Nuxt 4, Vue 3, TypeScript      |
| UI         | Nuxt UI, Tailwind CSS          |
| State      | Pinia                          |
| Tables     | TanStack Vue Table             |
| Auth       | Better Auth (Google OAuth)     |
| Database   | PostgreSQL (Neon), Drizzle ORM |
| Storage    | Cloudflare R2 (S3-compatible)  |
| Validation | Zod                            |

## Getting Started

### Prerequisites

- Node.js v20+
- A PostgreSQL database (e.g. [Neon](https://neon.tech))
- Google Cloud project with OAuth 2.0 credentials and Maps API key
- Cloudflare R2 bucket for certificate file storage

### Setup

```bash
git clone <repo-url>
cd smart-volley
npm install
cp .env.example .env
```

Fill in the `.env` file with your credentials (see table below).

```bash
npm run db:push    # Push schema to database
npm run db:seed    # Optional: populate with sample data
npm run dev        # Start dev server
```

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

| Command               | Description                      |
| --------------------- | -------------------------------- |
| `npm run dev`         | Start dev server                 |
| `npm run build`       | Production build                 |
| `npm run preview`     | Preview production build         |
| `npm run lint`        | Run ESLint                       |
| `npm run lint:fix`    | Run ESLint with auto-fix         |
| `npm run typecheck`   | TypeScript type checking         |
| `npm run db:generate` | Generate Drizzle migration files |
| `npm run db:migrate`  | Run pending migrations           |
| `npm run db:push`     | Push schema directly to database |
| `npm run db:studio`   | Open Drizzle Kit Studio          |
| `npm run db:seed`     | Seed database with sample data   |

## License

[MIT](LICENSE) — Daniele De Luca, 2026
