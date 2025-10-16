import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Obtener todos los productos
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { id: 'desc' }
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST - Crear nuevo producto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, imageUrl, images, categoryId, sku, barcode, reference } = body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        images: Array.isArray(images) ? images : [],
        categoryId,
        sku: sku || null,
        barcode: barcode || null,
        reference: reference || null
      },
      include: { category: true }
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear producto' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
