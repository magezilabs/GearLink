# API Conventions

1. **Standardized Response**: All API responses must use the structure defined in `src/lib/api-response.ts`:
   - Success: `{ success: true, data: T }`
   - Error: `{ success: false, error: { code: string, message: string } }`
2. **Validation**: Validate all inputs using Zod.
3. **Mutations Only**: API routes are only for mutations. Data reading is done directly by Server Components.
4. **Authentication**: Use role-based middleware from `src/lib/permissions.ts` on protected routes.
5. **Status Codes**: 
   - 200 OK
   - 201 Created
   - 400 Bad Request
   - 401 Unauthorized
   - 403 Forbidden
   - 404 Not Found
   - 500 Internal Server Error
