import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'Usuario no especificado' },
        { status: 400 }
      );
    }

    // Buscar el usuario y verificar si es admin
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      isAdmin: user.isAdmin
    });

  } catch (error) {
    console.error('Error al verificar admin:', error);
    return NextResponse.json(
      { error: 'Error al verificar permisos' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
