import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendWelcomeEmail } from '../../../lib/email';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, correo, password } = body;

    // Validar que todos los campos estén presentes
    if (!nombre || !correo || !password) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    // Verificar si el correo ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: correo }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'El correo ya está registrado' },
        { status: 400 }
      );
    }

    // Crear el usuario
    const user = await prisma.user.create({
      data: {
        name: nombre,
        email: correo,
        password: password
      }
    });

    // Enviar correo de bienvenida (sin bloquear el registro si falla)
    try {
      await sendWelcomeEmail(user.name, user.email);
      console.log('✅ Correo de bienvenida enviado a:', user.email);
    } catch (emailError) {
      console.error('❌ Error al enviar correo de bienvenida:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Usuario registrado correctamente',
      user: { id: user.id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return NextResponse.json(
      { error: 'Error al registrar el usuario' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
