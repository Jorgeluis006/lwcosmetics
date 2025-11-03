import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

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
    const { name, description, price, imageUrl, images, colors, categoryId, sku, barcode, reference } = body;

    const product: any = await prisma.product.create({
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
        reference: reference || null
      },
      include: { category: true }
    });

    // Revalidar las rutas afectadas
    revalidatePath('/productos');
    revalidatePath('/admin');
    
    // Revalidar la página de la categoría
    if (product?.category?.name) {
      revalidatePath(`/productos/categoria/${product.category.name}`);
      revalidatePath(`/productos/categoria/${product.category.name.toLowerCase()}`);
    }

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
