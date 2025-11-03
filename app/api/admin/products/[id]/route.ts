import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

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

    // Revalidar las rutas afectadas
    revalidatePath('/productos');
    revalidatePath('/admin');
    revalidatePath(`/productos/${id}`);
    
    // Revalidar la página de la categoría
    if (product?.category?.name) {
      revalidatePath(`/productos/categoria/${product.category.name}`);
      revalidatePath(`/productos/categoria/${product.category.name.toLowerCase()}`);
    }

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

    // Obtener el producto antes de eliminarlo para saber su categoría
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true }
    });

    await prisma.product.delete({
      where: { id }
    });

    // Revalidar las rutas afectadas
    revalidatePath('/productos');
    revalidatePath('/admin');
    
    // Revalidar la página de la categoría específica si existe
    if (product?.category?.name) {
      revalidatePath(`/productos/categoria/${product.category.name}`);
      revalidatePath(`/productos/categoria/${product.category.name.toLowerCase()}`);
    }

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
