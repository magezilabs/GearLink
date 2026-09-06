# Agent Guidelines: Modular & Functional Programming Standards

## Core Architecture & Paradigm

### 1. Pure Functional Style
- **No Class-Based Services or Repositories**: All modules, services, repositories, and utilities MUST be implemented as pure, standalone, exportable functions.
- **Side-Effect Isolation**: Core business logic functions must be deterministic and side-effect free. Place side-effects (DB queries, API requests, state mutations) strictly at the outer edges (Repositories, API Route Handlers, Action functions).
- **Immutability**: Avoid mutating parameters, state, or global objects. Always return new copies using object/array spread or immutable transformations.

### 2. High Modularity Rules
- **Component Decomposition**: No single UI file should exceed 150-200 lines of code. Break monolithic components into small, highly focused atomic components under `src/components/<domain>/`.
- **Single Responsibility Principle**: Each module file must handle exactly one domain concern (e.g. `equipment.repository.ts`, `equipment.types.ts`, `equipment.validation.ts`).
- **Feature-Based Directory Structure**:
  ```text
  src/
  ├── app/                  # Next.js App Router (Server Components & API Routes)
  ├── components/
  │   ├── ui/               # Generic primitive UI elements
  │   ├── equipment/        # Equipment-specific domain components
  │   ├── booking/          # Booking-specific domain components
  │   └── dashboard/        # Role dashboard components
  ├── modules/              # Core business logic & repositories (Pure functions)
  │   ├── equipment/
  │   ├── bookings/
  │   ├── auth/
  │   └── payments/
  └── lib/                  # Shared helper functions, types, and constants
  ```

### 3. Data Flow & Typing
- **Explicit Functional Pipelines**: Use function composition, data mapping, and pure transformations for processing records.
- **Strict TypeScript**: Enforce strict typing with zero `any` types. Utilize Zod schemas for runtime input validation and infer static types directly from Zod.
