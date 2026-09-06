import { drizzle } from 'drizzle-orm/sqlite-proxy';
import * as schema from './schema';

// Standardized functional database accessor
export const db = drizzle(async (sql, params, method) => {
  return { rows: [] };
}, { schema });
