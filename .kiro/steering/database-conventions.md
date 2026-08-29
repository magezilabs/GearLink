# Database Conventions

1. **ORM**: Drizzle ORM is used for all database interactions.
2. **IDs**: Use CUID2 for all primary keys.
3. **Timestamps**: All tables must include `created_at` and `updated_at`.
4. **Soft Deletes**: Use `deleted_at` for soft deletes where applicable.
5. **Migrations**: 
   - Use `drizzle-kit generate` to create migrations.
   - Use `drizzle-kit push` for local development.
6. **Schemas**: Define schemas in `src/db/schema/` grouped by domain if large, or in a single `index.ts` if small.
7. **Directives**: Repositories should encapsulate queries; no raw Drizzle queries in UI components or route handlers.
