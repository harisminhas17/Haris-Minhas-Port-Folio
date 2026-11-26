# Haris Minhas — Portfolio

Personal portfolio and a database-backed admin panel. Next.js 14 App Router,
Tailwind, Neon Postgres.

## Stack

- Next.js 14 (App Router, JavaScript)
- Tailwind CSS with CSS-variable design tokens
- Framer Motion for entrance animation
- Neon Postgres via `@neondatabase/serverless`
- `jose` for signed admin sessions, `scrypt` for password hashing

## Setup

```bash
pnpm install
cp .env.example .env      # then fill the values below
pnpm dev
```

### Environment

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Neon pooled connection string, keep `?sslmode=require`. |
| `ADMIN_EMAIL` | The single admin account email. |
| `ADMIN_PASSWORD_HASH` | Output of `pnpm hash-password "your-password"`. |
| `JWT_SECRET` | At least 32 random characters. Session signing key. |

Generate the two secrets:

```bash
pnpm hash-password "your-password"        # → ADMIN_PASSWORD_HASH
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"  # → JWT_SECRET
```

The password hash is colon-delimited (`scrypt:salt:hash`) on purpose. Next.js
runs `dotenv-expand` over `.env`, so a `$` in the value would be read as a
variable reference and silently blanked out.

### Database

```bash
pnpm db:push   # create tables from db/schema.sql
pnpm db:seed   # load the current content into Postgres
```

Without `DATABASE_URL` the public site still renders from
`lib/content.js` defaults, and the admin shows a "Database not connected"
notice instead of pretending to save.

## Using the admin

1. Open `/admin/login`.
2. Sign in with `ADMIN_EMAIL` and the password you hashed.
3. Edit collections under Content, site-wide copy under Settings, and read
   contact submissions under Messages. Image fields accept a path or an
   uploaded file (stored in Postgres `media`, served at `/api/media/:id`).

Navigation order in Projects, Experience, Capabilities, Testimonials, Social
links, Stack groups and Stack logos is controlled by the up/down arrows and is
what the public site renders.

## Scripts

| Script | Does |
|---|---|
| `pnpm dev` | Dev server on :3000 |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm db:push` | Apply `db/schema.sql` |
| `pnpm db:seed` | Insert default content (skips if rows exist) |
| `pnpm hash-password` | Print a hash for `ADMIN_PASSWORD_HASH` |

## Layout

```
app/
  page.jsx                     public site (reads Postgres, falls back to defaults)
  admin/login/                 sign-in
  admin/(dashboard)/           authed shell: overview, content, settings, messages
  api/auth/                    login, logout, session
  api/admin/                   collection CRUD, settings, media upload, messages
  api/contact/                 public contact form intake
  api/media/[id]/              serves uploaded images from Postgres
components/
  site/                        public sections
  admin/                       admin panel UI
  ui/                          Reveal + shared primitives
lib/
  content.js                   default content (seed source + fallback)
  content-repo.js              Postgres read path
  admin/collections.js         field config that drives both API and UI
db/schema.sql                  tables
scripts/                       db-push, seed, hash-password
```
