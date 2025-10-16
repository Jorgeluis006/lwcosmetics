import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST - Descontar stock de productos
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items } = body; // [{ id: number, quantity: number }]
    if (!Array.isArray(items)) {
      return NextResponse.json({ error: 'Formato inválido' }, { status: 400 });
    }

    // Actualizar el stock de cada producto
    const results = [];
    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.id } });
      if (!product) {
        results.push({ id: item.id, error: 'Producto no encontrado' });
        continue;
      }
      if (product.stock < item.quantity) {
        results.push({ id: item.id, error: 'Stock insuficiente' });
        continue;
      }
      await prisma.product.update({
        where: { id: item.id },
        data: { stock: { decrement: item.quantity } }
      });
      results.push({ id: item.id, success: true });
    }

    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json({ error: 'Error al descontar stock' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
