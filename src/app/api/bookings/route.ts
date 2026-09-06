import { NextResponse } from 'next/server';
import { insertBooking } from '@/modules/bookings';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.equipmentId || !body.renterId || !body.startDate || !body.endDate || !body.totalAmount) {
      return NextResponse.json(
        { success: false, error: { code: 'BAD_REQUEST', message: 'Missing required booking parameters' } },
        { status: 400 }
      );
    }

    const created = await insertBooking({
      equipmentId: body.equipmentId,
      renterId: body.renterId,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      rentalFeeTotal: Number(body.rentalFeeTotal || body.totalAmount * 0.7),
      securityDepositTotal: Number(body.securityDepositTotal || body.totalAmount * 0.25),
      serviceFeeTotal: Number(body.serviceFeeTotal || 25000),
      totalAmount: Number(body.totalAmount),
      purposeOfRental: body.purposeOfRental || 'General rental',
      siteAddress: body.siteAddress || 'Site delivery location',
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}
