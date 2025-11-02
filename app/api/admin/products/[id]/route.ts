import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// PUT - Actualizar producto
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, description, price, imageUrl, images, colors, categoryId, sku, barcode, reference, stock } = body;
    const id = parseInt(params.id);

    const product: any = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        imageUrl,
        images: Array.isArray(images) ? images : [],
        colors: Array.isArray(colors) ? colors : [],
        categoryId,
        sku: sku || null,
        barcode: barcode || null,
        reference: reference || null,
        stock: typeof stock === 'number' ? stock : undefined
      },
      include: { category: true }
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar producto' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE - Eliminar producto
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    await prisma.product.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar producto' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
