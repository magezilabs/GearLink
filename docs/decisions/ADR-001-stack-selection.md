# ADR-001: Stack Selection

## Context
We need a robust, scalable, and maintainable tech stack for the GearLink Rentals platform.

## Decision
- **Next.js 14+ (App Router)**: Provides Server Components for direct DB reads, eliminating unnecessary API layers for data fetching.
- **Drizzle ORM**: Type-safe, lightweight, and supports both SQLite (demo) and PostgreSQL (prod).
- **better-auth**: Modern, full-featured auth that is easily customizable for our five roles.
- **shadcn/ui & Tailwind CSS**: Allows for rapid UI development with full customizability.
- **Zod**: For robust runtime schema validation.

## Consequences
- Requires developers to understand the split between Server and Client components.
- Direct repository calls in Server Components mean we must ensure repositories do not leak sensitive information.
