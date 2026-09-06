import { eq, desc, and, isNull } from 'drizzle-orm';
import { db } from '@/db';
import { governanceLogs } from '@/db/schema';

export type NewGovernanceLogInput = {
  officerId: string;
  action: string;
  targetId: string;
  targetType: string;
  notes?: string;
};

/**
 * Finds governance audit logs.
 */
export async function findGovernanceLogs() {
  return await db
    .select()
    .from(governanceLogs)
    .where(isNull(governanceLogs.deletedAt))
    .orderBy(desc(governanceLogs.createdAt));
}

/**
 * Creates a governance audit log entry.
 */
export async function insertGovernanceLog(input: NewGovernanceLogInput) {
  const [created] = await db
    .insert(governanceLogs)
    .values({
      officerId: input.officerId,
      action: input.action,
      targetId: input.targetId,
      targetType: input.targetType,
      notes: input.notes,
    })
    .returning();

  return created;
}
