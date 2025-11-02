import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = parseInt(params.id);
    const { status } = await request.json();
    
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status }
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Error al actualizar pedido' }, { status: 500 });
  }
}
