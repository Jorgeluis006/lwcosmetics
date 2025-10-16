const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Verificar si ya existe un usuario admin
    const existingAdmin = await prisma.user.findFirst({
      where: { isAdmin: true }
    });

    if (existingAdmin) {
      console.log('Ya existe un usuario administrador:', existingAdmin.email);
      return;
    }

    // Verificar si existe el usuario con email admin@magna.com
    const existingUser = await prisma.user.findUnique({
      where: { email: 'admin@magna.com' }
    });

    if (existingUser) {
      // Actualizar el usuario existente a admin
      const updatedUser = await prisma.user.update({
        where: { email: 'admin@magna.com' },
        data: { isAdmin: true }
      });
      console.log('Usuario actualizado a administrador:', updatedUser.email);
    } else {
      // Crear un nuevo usuario admin
      const newAdmin = await prisma.user.create({
        data: {
          name: 'Administrador',
          email: 'admin@magna.com',
          password: 'admin123', // En producción deberías usar bcrypt
          isAdmin: true
        }
      });
      console.log('Nuevo usuario administrador creado:', newAdmin.email);
      console.log('Contraseña: admin123');
    }
  } catch (error) {
    console.error('Error al crear administrador:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
