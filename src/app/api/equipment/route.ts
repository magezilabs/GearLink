import { NextResponse } from 'next/server';
import { findEquipmentList, insertEquipment } from '@/modules/equipment';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;

    const data = await findEquipmentList(category);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.ownerId || !body.name || !body.category || !body.dailyRate) {
      return NextResponse.json(
        { success: false, error: { code: 'BAD_REQUEST', message: 'Missing required fields' } },
        { status: 400 }
      );
    }

    const created = await insertEquipment({
      ownerId: body.ownerId,
      name: body.name,
      description: body.description || '',
      category: body.category,
      sector: body.sector || 'General',
      location: body.location || 'Unknown',
      dailyRate: Number(body.dailyRate),
      imageUrl: body.imageUrl,
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}
