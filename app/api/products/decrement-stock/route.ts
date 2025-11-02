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

    // PASO 1: Validar que todos los productos tengan stock suficiente
    const validations = [];
    for (const item of items) {
      const productId = typeof item.id === 'string' ? parseInt(item.id) : item.id;
      
      const product = await prisma.product.findUnique({ 
        where: { id: productId } 
      });
      
      if (!product) {
        return NextResponse.json({ 
          error: `Producto ${item.id} no encontrado` 
        }, { status: 404 });
      }
      
      if (product.stock < item.quantity) {
        return NextResponse.json({ 
          error: `Stock insuficiente para ${product.name}. Disponible: ${product.stock}, Solicitado: ${item.quantity}` 
        }, { status: 400 });
      }
      
      validations.push({ productId, quantity: item.quantity, name: product.name });
    }

    // PASO 2: Si todo está OK, decrementar el stock en una transacción
    const results = await prisma.$transaction(
      validations.map(({ productId, quantity }) =>
        prisma.product.update({
          where: { id: productId },
          data: { stock: { decrement: quantity } }
        })
      )
    );

    return NextResponse.json({ 
      success: true, 
      message: 'Stock actualizado correctamente',
      updated: results.length 
    });
    
  } catch (error) {
    console.error('Error al descontar stock:', error);
    return NextResponse.json({ 
      error: 'Error al descontar stock' 
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
