# TeaStream – Backend

GraphQL-API für die Streaming-Plattform TeaStream. Gebaut mit **NestJS**, **Apollo GraphQL**, **Prisma** (PostgreSQL) und **Redis**.

## Tech-Stack

| Bereich         | Technologie                                            |
| --------------- | ------------------------------------------------------ |
| Framework       | NestJS 12, Express 5                                   |
| API             | GraphQL (Apollo Server 5, Code-First), Subscriptions   |
| Datenbank       | PostgreSQL + Prisma 7 (`@prisma/adapter-pg`)           |
| Sessions        | `express-session` mit Redis-Store                      |
| Streaming       | LiveKit (Ingress, Webhooks)                            |
| Zahlungen       | Stripe (Sponsoring-Abos, Webhooks)                     |
| Dateien         | S3-kompatibler Storage, Bildverarbeitung mit `sharp`   |
| E-Mails         | `@nestjs-modules/mailer` + React Email Templates       |
| Benachrichtigung| In-App, E-Mail und Telegram-Bot (`nestjs-telegraf`)    |
| Auth            | Passwort-Hashing mit Argon2, 2FA via TOTP              |

## Features

- **Auth**: Registrierung, Login/Logout, Sessions (mit Geräte- und Standortinfo), E-Mail-Verifizierung, Passwort-Reset, TOTP-2FA, Account-Deaktivierung
- **Profil**: Avatar, Profildaten, Social Links
- **Streams**: Stream-Verwaltung, LiveKit-Ingress (RTMP/WHIP), Thumbnails, Kategorien
- **Chat**: Live-Chat pro Stream über GraphQL-Subscriptions
- **Follows**: Kanälen folgen
- **Benachrichtigungen**: Neue Follower, Stream-Start, Sponsoring u. a. – per App, E-Mail und Telegram, einstellbar pro User
- **Sponsoring**: Sponsoring-Pläne, Abos und Transaktionen über Stripe
- **Cron-Jobs**: Löschen deaktivierter Accounts und alter Benachrichtigungen, automatische Kanal-Verifizierung, Erinnerung an 2FA

## Projektstruktur

```
backend/
├── prisma/
│   ├── schema.prisma        # Datenbankschema
│   ├── migrations/          # Versionierte Migrationen (committed)
│   └── generated/           # Generierter Prisma Client (nicht committed)
├── scripts/
│   ├── fetch-assets.ts      # Lädt Platzhalter-Bilder für den Seed nach S3
│   └── assets/              # Lokale Bilder für Nicht-Steam-Kategorien
└── src/
    ├── main.ts              # Bootstrap: Session, CORS, Upload, Validation
    ├── core.module.ts       # Root-Modul
    ├── core/
    │   ├── config/          # Configs für GraphQL, Mailer, LiveKit, Stripe, Telegram
    │   ├── graphql/         # Automatisch generiertes schema.gql
    │   ├── prisma/          # PrismaService + Seed
    │   └── redis/           # RedisService
    ├── modules/
    │   ├── auth/            # account, session, profile, totp, verification, …
    │   ├── category/  channel/  chat/  follow/  stream/
    │   ├── notification/    # Benachrichtigungen + Einstellungen
    │   ├── sponsorship/     # plan, subscription, transaction
    │   ├── webhook/         # REST-Endpunkte für LiveKit und Stripe
    │   ├── cron/
    │   └── libs/            # livekit, mail, storage, stripe, telegram
    └── shared/              # Decorators, Guards, Pipes, Middlewares, Utils
```

## Voraussetzungen

- Node.js 22+
- Docker (für PostgreSQL und Redis)
- Accounts/Keys für: S3-Storage, LiveKit, Stripe, SMTP, Telegram-Bot

## Setup

### 1. Umgebungsvariablen

Die `.env` liegt im **Root des Monorepos** und wird von Backend und Docker Compose gemeinsam genutzt:

```bash
# im Root des Repos
cp .env.example .env
```

Danach die leeren Werte (Secrets, Zugangsdaten) ausfüllen.

### 2. Datenbank und Redis starten

```bash
# im Root des Repos
docker compose up -d
```

- PostgreSQL läuft auf **Port 5433** (Host) → 5432 (Container)
- Redis läuft auf **Port 6379**, mit Passwort aus `REDIS_PASSWORD`

### 3. Abhängigkeiten installieren

```bash
cd backend
npm install        # führt automatisch `prisma generate` aus (postinstall)
```

### 4. Datenbank migrieren und befüllen

```bash
npm run db:push    # Migrationen anwenden (prisma migrate dev)
npm run db:seed    # Testdaten: Kategorien, User, Streams
```

Optional Platzhalter-Bilder für die Seed-Daten nach S3 hochladen:

```bash
npm run assets:fetch
npm run assets:fetch -- --only=avatars --force
npm run assets:fetch -- --dry-run
```

### 5. Starten

```bash
npm run start:dev
```

Die GraphQL-API ist dann unter `http://localhost:<APPLICATION_PORT><GRAPHQL_PREFIX>` erreichbar. Im Modus `NODE_ENV=development` ist der GraphQL Playground aktiv.

## Scripts

| Script                 | Beschreibung                                         |
| ---------------------- | ---------------------------------------------------- |
| `start:dev`            | Dev-Server mit Watch-Mode                            |
| `start:debug`          | Dev-Server mit Debugger                              |
| `build`                | Produktions-Build nach `dist/`                       |
| `start:prod`           | Startet den Build aus `dist/`                        |
| `lint` / `format`      | ESLint / Prettier                                    |
| `test` / `test:e2e`    | Unit- / E2E-Tests (Jest)                             |
| `db:push`              | Neue Migration erstellen und anwenden (Entwicklung)  |
| `db:deploy`            | Vorhandene Migrationen anwenden (Produktion/CI)      |
| `db:generate`          | Prisma Client neu generieren                         |
| `db:reset`             | Datenbank zurücksetzen und neu migrieren             |
| `db:studio`            | Prisma Studio öffnen                                 |
| `db:format`            | `schema.prisma` formatieren                          |
| `db:seed`              | Testdaten einspielen                                 |
| `assets:fetch`         | Seed-Bilder herunterladen und nach S3 hochladen      |

## Umgebungsvariablen

Alle Variablen mit Beispielwerten stehen in [`../.env.example`](../.env.example). Der Pfad zur `.env` wird zentral in `src/shared/utils/env-path.util.ts` festgelegt (`../.env` relativ zu `backend/`).

Variablen können über `${...}` aufeinander verweisen (`expandVariables` ist aktiv). Außerhalb von `NODE_ENV=development` wird die `.env` **nicht** geladen – dort müssen die Variablen aus der Umgebung kommen.

## Webhooks

| Endpunkt                | Quelle  | Zweck                                         |
| ----------------------- | ------- | --------------------------------------------- |
| `POST /webhook/livekit` | LiveKit | Stream-Status (live/offline) aktualisieren    |
| `POST /webhook/stripe`  | Stripe  | Checkout-Sessions (abgeschlossen/abgelaufen)  |

Für lokale Entwicklung Stripe-Events weiterleiten:

```bash
stripe listen --forward-to localhost:<APPLICATION_PORT>/webhook/stripe
```

LiveKit braucht eine öffentlich erreichbare URL (z. B. über ngrok oder Cloudflare Tunnel).

## Prisma-Workflow

1. `prisma/schema.prisma` ändern
2. `npm run db:push` – erstellt eine neue Migration in `prisma/migrations/` und generiert den Client
3. Migration zusammen mit dem Schema committen

`prisma/generated/` ist in `.gitignore` und wird bei `npm install` bzw. `npm run db:generate` neu erzeugt.
