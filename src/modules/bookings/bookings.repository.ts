import { eq, desc, and, isNull } from 'drizzle-orm';
import { db } from '@/db';
import { bookings } from '@/db/schema';

export type NewBookingInput = {
  equipmentId: string;
  renterId: string;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
};

/**
 * Finds all bookings for a renter.
 */
export async function findBookingsByRenter(renterId: string) {
  return await db
    .select()
    .from(bookings)
    .where(and(eq(bookings.renterId, renterId), isNull(bookings.deletedAt)))
    .orderBy(desc(bookings.createdAt));
}

/**
 * Finds a booking by ID.
 */
export async function findBookingById(id: string) {
  const [booking] = await db
    .select()
    .from(bookings)
    .where(and(eq(bookings.id, id), isNull(bookings.deletedAt)))
    .limit(1);

  return booking || null;
}

/**
 * Creates a new booking record.
 */
export async function insertBooking(input: NewBookingInput) {
  const [created] = await db
    .insert(bookings)
    .values({
      equipmentId: input.equipmentId,
      renterId: input.renterId,
      startDate: input.startDate,
      endDate: input.endDate,
      totalAmount: input.totalAmount,
      status: 'PENDING',
    })
    .returning();

  return created;
}
