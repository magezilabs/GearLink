import { eq, and, isNull } from 'drizzle-orm';
import { db } from '@/db';
import { users } from '@/db/schema';

export type NewUserInput = {
  name: string;
  email: string;
  role: string;
  phone?: string;
};

/**
 * Finds user by email address.
 */
export async function findUserByEmail(email: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.email, email), isNull(users.deletedAt)))
    .limit(1);

  return user || null;
}

/**
 * Inserts a new user record.
 */
export async function insertUser(input: NewUserInput) {
  const [created] = await db
    .insert(users)
    .values({
      name: input.name,
      email: input.email,
      role: input.role,
      phone: input.phone,
    })
    .returning();

  return created;
}
