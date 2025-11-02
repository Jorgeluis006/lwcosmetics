import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST - Subir imagen de perfil (Base64)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, imageData } = body;

    if (!userId || !imageData) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    // Actualizar la imagen de perfil del usuario
    const user = await prisma.user.update({
      where: { id: userId },
      data: { profileImage: imageData },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        profileImage: true
      }
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Error al actualizar imagen de perfil:', error);
    return NextResponse.json({ error: 'Error al actualizar imagen' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE - Eliminar imagen de perfil
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId requerido' }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { profileImage: null },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        profileImage: true
      }
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Error al eliminar imagen de perfil:', error);
    return NextResponse.json({ error: 'Error al eliminar imagen' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
