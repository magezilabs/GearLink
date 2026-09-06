import { eq, desc, and, isNull } from 'drizzle-orm';
import { db } from '../../db';
import { equipment, equipmentImages } from '../../db/schema';

export type NewEquipmentInput = {
  ownerId: string;
  name: string;
  description: string;
  category: string;
  sector: string;
  location: string;
  dailyRate: number;
  imageUrl?: string;
};

/**
 * Finds all active equipment items from the database with primary image.
 */
export async function findEquipmentList(category?: string) {
  const query = db
    .select({
      id: equipment.id,
      ownerId: equipment.ownerId,
      name: equipment.name,
      description: equipment.description,
      category: equipment.category,
      sector: equipment.sector,
      location: equipment.location,
      dailyRate: equipment.dailyRate,
      status: equipment.status,
      createdAt: equipment.createdAt,
    })
    .from(equipment)
    .where(
      category 
        ? and(isNull(equipment.deletedAt), eq(equipment.category, category))
        : isNull(equipment.deletedAt)
    )
    .orderBy(desc(equipment.createdAt));

  return await query;
}

/**
 * Finds a single equipment record by ID.
 */
export async function findEquipmentById(id: string) {
  const results = await db
    .select()
    .from(equipment)
    .where(and(eq(equipment.id, id), isNull(equipment.deletedAt)))
    .limit(1);

  if (!results.length) return null;

  const images = await db
    .select()
    .from(equipmentImages)
    .where(eq(equipmentImages.equipmentId, id));

  return {
    ...results[0],
    images,
  };
}

/**
 * Inserts a new equipment item and optionally its primary image.
 */
export async function insertEquipment(input: NewEquipmentInput) {
  const [created] = await db
    .insert(equipment)
    .values({
      ownerId: input.ownerId,
      name: input.name,
      description: input.description,
      category: input.category,
      sector: input.sector,
      location: input.location,
      dailyRate: input.dailyRate,
      status: 'AVAILABLE',
    })
    .returning();

  if (input.imageUrl) {
    await db.insert(equipmentImages).values({
      equipmentId: created.id,
      url: input.imageUrl,
      isPrimary: true,
    });
  }

  return created;
}
