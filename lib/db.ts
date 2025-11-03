import { PrismaClient } from '@prisma/client';

// Optimización: Singleton de PrismaClient para reutilizar la conexión
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['error', 'warn'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function getAllProducts() {
  return await prisma.product.findMany({
    include: { category: true },
    orderBy: { id: 'asc' }
  });
}

export async function getProductById(id: number) {
  return await prisma.product.findUnique({
    where: { id },
    include: { category: true }
  });
}

export async function getAllCategories() {
  return await prisma.category.findMany({
    include: { products: true },
    orderBy: { name: 'asc' },
  });
}

export async function getCategoryByName(name: string) {
  return await prisma.category.findFirst({
    where: { 
      name: {
        equals: name,
        mode: 'insensitive' // Case insensitive
      }
    },
    include: { products: true }
  });
}

// Cerrar Prisma al terminar el proceso
export { prisma };
