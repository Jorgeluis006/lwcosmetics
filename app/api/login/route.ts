import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { correo, password } = body;

    // Validar que todos los campos estén presentes
    if (!correo || !password) {
      return NextResponse.json(
        { error: 'Correo y contraseña son obligatorios' },
        { status: 400 }
      );
    }

    // Buscar el usuario por correo
    const user = await prisma.user.findUnique({
      where: { email: correo }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Correo o contraseña incorrectos' },
        { status: 401 }
      );
    }

    // Verificar la contraseña
    if (user.password !== password) {
      return NextResponse.json(
        { error: 'Correo o contraseña incorrectos' },
        { status: 401 }
      );
    }

    // Login exitoso
    return NextResponse.json({
      success: true,
      message: 'Login exitoso',
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email,
        isAdmin: user.isAdmin
      }
    });

  } catch (error) {
    console.error('Error al hacer login:', error);
    return NextResponse.json(
      { error: 'Error al iniciar sesión' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
