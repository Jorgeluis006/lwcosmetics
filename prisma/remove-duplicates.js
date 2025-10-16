// Script para eliminar productos duplicados por nombre en la base de datos
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const productos = await prisma.product.findMany();
  const nombres = new Set();
  let eliminados = 0;
  for (const producto of productos) {
    if (nombres.has(producto.name)) {
      await prisma.product.delete({ where: { id: producto.id } });
      eliminados++;
      console.log(`Eliminado duplicado: ${producto.name}`);
    } else {
      nombres.add(producto.name);
    }
  }
  console.log(`\n✓ Eliminados ${eliminados} productos duplicados.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
