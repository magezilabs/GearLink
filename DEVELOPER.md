# Developer Guide

## Stack
- Framework: Next.js 14+ (App Router)
- ORM: Drizzle ORM
- Auth: better-auth
- Database: SQLite (demo) → PostgreSQL (prod)
- UI: shadcn/ui + Tailwind CSS
- Uploads: Uploadthing
- Validation: Zod
- Testing: Vitest + Playwright

## Folder Structure
- `src/app/` - Next.js routing, Server Components for reads, route handlers for mutations
- `src/modules/` - Business logic (pure functions, repositories, services)
- `src/db/` - Database schema, migrations, and connections
- `src/lib/` - Shared utilities, errors, permissions, and constants
- `src/components/` - UI, equipment, bookings, dashboard, and governance components

## Commands
- `pnpm dev` - Start development server
- `pnpm db:generate` - Generate Drizzle migrations
- `pnpm db:push` - Push database schema
- `pnpm test:unit` - Run unit tests
- `pnpm test:e2e` - Run E2E tests
