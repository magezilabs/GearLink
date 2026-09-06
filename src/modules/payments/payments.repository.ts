import { eq, and, isNull } from 'drizzle-orm';
import { db } from '@/db';
import { payments } from '@/db/schema';

export type NewPaymentInput = {
  bookingId: string;
  amount: number;
  provider: string;
  transactionId?: string;
};

/**
 * Finds payments associated with a booking.
 */
export async function findPaymentsByBooking(bookingId: string) {
  return await db
    .select()
    .from(payments)
    .where(and(eq(payments.bookingId, bookingId), isNull(payments.deletedAt)));
}

/**
 * Inserts a new escrow payment record.
 */
export async function insertPayment(input: NewPaymentInput) {
  const [created] = await db
    .insert(payments)
    .values({
      bookingId: input.bookingId,
      amount: input.amount,
      provider: input.provider,
      transactionId: input.transactionId,
      status: 'PENDING',
    })
    .returning();

  return created;
}
