import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST - Crear un nuevo pedido
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, nombre, direccion, ciudad, telefono, items } = body;
    if (!userId || !nombre || !direccion || !ciudad || !telefono || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }
    // Crear el pedido
    const order = await prisma.order.create({
      data: {
        userId,
        nombre,
        direccion,
        ciudad,
        telefono,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        }
      }
    });
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear pedido' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
