# Architecture

## Core Principles
1. **Separation of Concerns**: UI, API, Business Logic, and Data Access must remain distinct.
2. **Server Components for Reads**: All data fetching for pages happens directly in Server Components using repository functions. No fetch requests to our own API.
3. **Route Handlers for Mutations**: API routes are exclusively used for mutations (POST, PUT, DELETE) triggered by client components.
4. **Pure Modules**: Business logic resides in `src/modules/`. Modules export pure functions, never classes.
5. **Data Access**: All DB interactions happen in `src/modules/<domain>/<domain>.repository.ts`.
