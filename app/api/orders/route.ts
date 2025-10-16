import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Obtener pedidos del usuario autenticado (por id)
export async function GET(request: NextRequest) {
  try {
    const userId = Number(request.nextUrl.searchParams.get('userId'));
    if (!userId) {
      return NextResponse.json({ error: 'Falta userId' }, { status: 400 });
    }
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: { include: { product: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener pedidos' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
