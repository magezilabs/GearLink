# Coding Conventions

1. **Functional Programming**: Avoid classes for services and repositories. Export standalone functions.
2. **Strict Typing**: Use strict TypeScript. Avoid `any`. Use Zod for runtime validation.
3. **Immutability**: Avoid mutating objects.
4. **Error Handling**: Use standard error objects defined in `src/lib/errors.ts`. Avoid throwing raw strings.
5. **Component Structure**: Keep components small and focused. Complex components should be broken down into sub-components.
6. **No Shared State via Modules**: State should be passed as arguments.
