// Script para borrar todos los productos de la categoría Ojos
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const ojos = await prisma.category.findFirst({ where: { name: 'Ojos' } });
  if (!ojos) {
    console.log('No existe la categoría Ojos');
    return;
  }
  const deleted = await prisma.product.deleteMany({ where: { categoryId: ojos.id } });
  console.log(`Eliminados ${deleted.count} productos de Ojos.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
