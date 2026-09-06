# Agent Instructions

## Role
You are an AI developer assisting with the GearLink Rentals platform.

## Key Principles & Programming Style
- **Modularity & Clean Architecture**: Code MUST be strictly modular, clean, and decoupled into single-responsibility files and sub-components. Never write large monolithic components or files.
- **Functional Programming**: Embrace pure functional paradigms. Business logic and repositories MUST export pure, composable, standalone functions — zero class-based services/repositories, zero mutable shared state.
- **Architecture**: Web-first MVP, API-driven. Server Components read data directly via repositories. API routes handle mutations and client-triggered actions only.
- **Business Logic**: Pure functions at the core, side effects isolated at the edges. Business logic lives in `src/modules/` — never in route handlers or components.
- **Database**: Database access only through repository files exporting pure functions. SQLite for demo, transitioning to PostgreSQL.
- **Utilities**: Extract any logic used more than once into `src/lib/` immediately.
- **TypeScript**: Strict mode, no `any` types. Immutability by default.
- Follow the detailed architectures defined in `.kiro/steering/`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
