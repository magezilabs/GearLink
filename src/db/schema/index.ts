import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

const timestamps = {
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }),
};

export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  role: text('role').notNull(), // PLATFORM_ADMIN, GOVERNANCE_OFFICER, EQUIPMENT_OWNER, RENTER, YOUTH_AGENT
  phone: text('phone'),
  ...timestamps,
});

export const equipment = sqliteTable('equipment', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  ownerId: text('owner_id').notNull().references(() => users.id),
  name: text('name').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(), // tractor, excavator, etc.
  sector: text('sector').notNull(), // agriculture, construction, etc.
  location: text('location').notNull(),
  dailyRate: real('daily_rate').notNull(),
  status: text('status').notNull().default('AVAILABLE'), // AVAILABLE, RENTED, MAINTENANCE, INACTIVE
  ...timestamps,
});

export const equipmentImages = sqliteTable('equipment_images', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  equipmentId: text('equipment_id').notNull().references(() => equipment.id),
  url: text('url').notNull(),
  isPrimary: integer('is_primary', { mode: 'boolean' }).notNull().default(false),
  ...timestamps,
});

export const bookings = sqliteTable('bookings', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  equipmentId: text('equipment_id').notNull().references(() => equipment.id),
  renterId: text('renter_id').notNull().references(() => users.id),
  startDate: integer('start_date', { mode: 'timestamp' }).notNull(),
  endDate: integer('end_date', { mode: 'timestamp' }).notNull(),
  totalAmount: real('total_amount').notNull(),
  status: text('status').notNull().default('PENDING'), // PENDING, CONFIRMED, ACTIVE, COMPLETED, CANCELLED
  ...timestamps,
});

export const payments = sqliteTable('payments', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  bookingId: text('booking_id').notNull().references(() => bookings.id),
  amount: real('amount').notNull(),
  provider: text('provider').notNull(), // MTN_MOMO, AIRTEL_MONEY
  transactionId: text('transaction_id'),
  status: text('status').notNull().default('PENDING'), // PENDING, COMPLETED, FAILED
  ...timestamps,
});

export const reviews = sqliteTable('reviews', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  bookingId: text('booking_id').notNull().references(() => bookings.id),
  reviewerId: text('reviewer_id').notNull().references(() => users.id),
  rating: integer('rating').notNull(), // 1-5
  comment: text('comment'),
  ...timestamps,
});

export const governanceLogs = sqliteTable('governance_logs', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  officerId: text('officer_id').notNull().references(() => users.id),
  action: text('action').notNull(),
  targetId: text('target_id').notNull(), // ID of the equipment, user, etc.
  targetType: text('target_type').notNull(),
  notes: text('notes'),
  ...timestamps,
});
