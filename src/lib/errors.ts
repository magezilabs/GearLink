export class AppError extends Error {
  constructor(public code: string, message: string, public statusCode: number = 400, public details?: unknown) {
    super(message);
    this.name = 'AppError';
  }
}

export const Errors = {
  Unauthorized: () => new AppError('UNAUTHORIZED', 'You must be logged in to perform this action', 401),
  Forbidden: () => new AppError('FORBIDDEN', 'You do not have permission to perform this action', 403),
  NotFound: (resource: string) => new AppError('NOT_FOUND', `${resource} not found`, 404),
  ValidationFailed: (details?: unknown) => new AppError('VALIDATION_FAILED', 'Invalid input data', 400, details),
};
