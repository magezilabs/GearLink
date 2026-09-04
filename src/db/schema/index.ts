import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

const timestamps = {
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }),
};

/* ---------------- 1. USERS & IDENTITY VERIFICATION ---------------- */
export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  role: text('role').notNull(), // PLATFORM_ADMIN, GOVERNANCE_OFFICER, EQUIPMENT_OWNER, RENTER, YOUTH_AGENT
  phone: text('phone').notNull(),
  
  // 1. Identity Verification Fields
  ninNumber: text('nin_number'), // Uganda National ID Number (e.g. CM1234567890)
  ninFrontUrl: text('nin_front_url'), // Photo of National ID Front
  ninBackUrl: text('nin_back_url'), // Photo of National ID Back
  selfieUrl: text('selfie_url'), // Live selfie match photo
  physicalAddress: text('physical_address'), // Physical address / Parish
  villageLC1: text('village_lc1'), // LC1 village / Local authority jurisdiction
  verificationStatus: text('verification_status').notNull().default('UNVERIFIED'), // UNVERIFIED, PENDING_LC1, VERIFIED, REJECTED
  
  // 2. Financial Trust Signals & Safeguards
  trustScore: integer('trust_score').notNull().default(100), // Platform Trust Score (100 - 1000)
  isFirstTimeRenter: integer('is_first_time_renter', { mode: 'boolean' }).notNull().default(true),
  isFlagged: integer('is_flagged', { mode: 'boolean' }).notNull().default(false),
  flagReason: text('flag_reason'), // Governance officer flag reason (prior dispute / overstay)
  
  ...timestamps,
});

/* ---------------- 2. GUARANTOR & SOCIAL ACCOUNTABILITY ---------------- */
export const renterProfiles = sqliteTable('renter_profiles', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  renterId: text('renter_id').notNull().references(() => users.id),
  
  // Next of Kin Guarantor
  nextOfKinName: text('next_of_kin_name').notNull(),
  nextOfKinPhone: text('next_of_kin_phone').notNull(),
  nextOfKinRelation: text('next_of_kin_relation'),
  
  // LC1 Chairperson / Rural Authority Reference
  lc1ChairpersonName: text('lc1_chairperson_name').notNull(),
  lc1ChairpersonPhone: text('lc1_chairperson_phone').notNull(),
  lc1VerifiedByAgentId: text('lc1_verified_by_agent_id').references(() => users.id), // Youth agent in-person verification
  
  // Commercial / Business Reference (for heavy machinery)
  employerBusinessName: text('employer_business_name'),
  businessTinNumber: text('business_tin_number'),
  
  ...timestamps,
});

/* ---------------- 3. EQUIPMENT ---------------- */
export const equipment = sqliteTable('equipment', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  ownerId: text('owner_id').notNull().references(() => users.id),
  name: text('name').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(), // tractor, excavator, etc.
  sector: text('sector').notNull(), // agriculture, construction, etc.
  location: text('location').notNull(),
  dailyRate: real('daily_rate').notNull(),
  requiredSecurityDeposit: real('required_security_deposit').notNull().default(0), // Refundable escrow stake
  requiresYouthAgent: integer('requires_youth_agent', { mode: 'boolean' }).notNull().default(false), // Heavy gear logistics check
  hasGpsTracker: integer('has_gps_tracker', { mode: 'boolean' }).notNull().default(false),
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

/* ---------------- 4. BOOKINGS, LOGISTICS & TRUST STAKE ---------------- */
export const bookings = sqliteTable('bookings', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  equipmentId: text('equipment_id').notNull().references(() => equipment.id),
  renterId: text('renter_id').notNull().references(() => users.id),
  assignedYouthAgentId: text('assigned_youth_agent_id').references(() => users.id),
  
  startDate: integer('start_date', { mode: 'timestamp' }).notNull(),
  endDate: integer('end_date', { mode: 'timestamp' }).notNull(),
  
  // 4. Purpose & Site Details
  purposeOfRental: text('purpose_of_rental').notNull(), // e.g. "Ploughing 5 acres in Kicwamba"
  siteAddress: text('site_address').notNull(), // Worksite / Delivery location
  
  // Amounts
  rentalFeeTotal: real('rental_fee_total').notNull(),
  securityDepositTotal: real('security_deposit_total').notNull(), // Refundable stake held in escrow
  serviceFeeTotal: real('service_fee_total').notNull(),
  totalAmount: real('total_amount').notNull(),
  
  // 5. Tracking & Escrow Enforcement
  gpsConsentGiven: integer('gps_consent_given', { mode: 'boolean' }).notNull().default(true),
  latestGpsLatitude: real('latest_gps_latitude'),
  latestGpsLongitude: real('latest_gps_longitude'),
  
  escrowStatus: text('escrow_status').notNull().default('HELD'), // HELD, RELEASED, FORFEITED, PARTIAL_DISPUTED
  status: text('status').notNull().default('PENDING'), // PENDING, CONFIRMED, INSPECTED_DELIVERED, ACTIVE, RETURNED_INSPECTION, COMPLETED, CANCELLED
  ...timestamps,
});

/* ---------------- 5. ESCROW LEDGER ---------------- */
export const escrowLedger = sqliteTable('escrow_ledger', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  bookingId: text('booking_id').notNull().references(() => bookings.id),
  renterId: text('renter_id').notNull().references(() => users.id),
  ownerId: text('owner_id').notNull().references(() => users.id),
  
  rentalAmountHeld: real('rental_amount_held').notNull(),
  depositAmountHeld: real('deposit_amount_held').notNull(),
  rentalAmountReleased: real('rental_amount_released').notNull().default(0),
  depositAmountRefunded: real('deposit_amount_refunded').notNull().default(0),
  penaltyDeducted: real('penalty_deducted').notNull().default(0),
  
  releaseReason: text('release_reason'),
  releasedAt: integer('released_at', { mode: 'timestamp' }),
  ...timestamps,
});

/* ---------------- 6. HANDOFF & RETURN INSPECTION REPORTS ---------------- */
export const inspectionReports = sqliteTable('inspection_reports', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  bookingId: text('booking_id').notNull().references(() => bookings.id),
  inspectorId: text('inspector_id').notNull().references(() => users.id), // Youth Agent or Owner ID
  type: text('type').notNull(), // HANDOFF_DELIVERY, RETURN_CHECKIN
  
  conditionStatus: text('condition_status').notNull(), // EXCELLENT, MINOR_WEAR, DAMAGE_OBSERVED
  conditionNotes: text('condition_notes'),
  photoUrl: text('photo_url').notNull(), // Timestamped condition photo
  gpsLatitude: real('gps_latitude'),
  gpsLongitude: real('gps_longitude'),
  
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
  targetType: text('target_type').notNull(), // USER, BOOKING, EQUIPMENT
  notes: text('notes'),
  ...timestamps,
});
