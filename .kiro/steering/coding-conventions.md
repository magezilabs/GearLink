# Coding Conventions

1. **Functional Programming**: Strictly export standalone pure functions. Do not use classes for services, repositories, or controllers. Keep functions deterministic and side-effect free where possible.
2. **High Modularity**: Maintain small, focused, single-responsibility files and components. Break large components into modular sub-components (target < 150-200 lines per file).
3. **Strict Typing & Runtime Validation**: Use strict TypeScript (`noImplicitAny`, no `any`). Enforce input schemas with Zod.
4. **Immutability**: Treat data structures as immutable. Use functional transformations (`map`, `filter`, `reduce`, object spread) instead of mutating in place.
5. **Error Handling**: Use standard error factories defined in `src/lib/errors.ts`. Avoid throwing unhandled raw strings.
6. **No Shared State via Modules**: Pass state explicitly as function parameters or React props. Avoid module-level mutable variables.
