import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendOrderConfirmationEmail } from '../../../lib/email';

const prisma = new PrismaClient();

// GET - Obtener todos los pedidos (admin) o por usuario
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');
    
    if (userId) {
      // Obtener pedidos de un usuario específico
      const orders = await prisma.order.findMany({
        where: { userId: Number(userId) },
        include: {
          items: { include: { product: true } }
        },
        orderBy: { createdAt: 'desc' }
      });
      return NextResponse.json(orders);
    } else {
      // Obtener todos los pedidos (admin)
      const orders = await prisma.order.findMany({
        include: {
          items: { include: { product: true } },
          user: true
        },
        orderBy: { createdAt: 'desc' }
      });
      return NextResponse.json(orders);
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Error al obtener pedidos' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// POST - Crear un nuevo pedido
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, nombre, direccion, ciudad, telefono, items, userEmail } = body;
    
    if (!nombre || !direccion || !ciudad || !telefono || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }
    
    // Calcular el total
    const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    
    // Crear el pedido
    const order = await prisma.order.create({
      data: {
        userId: userId || null,
        nombre,
        direccion,
        ciudad,
        telefono,
        total,
        status: 'pendiente',
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        },
        user: true
      }
    });
    
    // Enviar correo de confirmación
    const emailToSend = userEmail || order.user?.email;
    if (emailToSend) {
      await sendOrderConfirmationEmail(
        nombre,
        emailToSend,
        order.id,
        order.items,
        total,
        { direccion, ciudad, telefono }
      );
    }
    
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Error al crear pedido' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

