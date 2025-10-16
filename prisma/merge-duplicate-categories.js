const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Normalizar nombre objetivo (case-insensitive, sin espacios extras)
  const targetName = 'Ojos';

  // Obtener todas las categorías cuyo nombre coincide por mayúsculas/minúsculas
  const categories = await prisma.category.findMany({ where: { name: { in: [targetName, targetName.toLowerCase(), targetName.toUpperCase()] } } });

  // Si no hay duplicados, salir
  if (categories.length <= 1) {
    console.log('No se encontraron duplicados para "Ojos". Categorías encontradas:', categories.map(c => `${c.id}:${c.name}`).join(', '));
    return;
  }

  // Obtener conteos de productos por categoría
  const withCounts = await Promise.all(categories.map(async (cat) => {
    const count = await prisma.product.count({ where: { categoryId: cat.id } });
    return { ...cat, count };
  }));

  // Ordenar por mayor cantidad de productos
  withCounts.sort((a, b) => b.count - a.count);

  const keep = withCounts[0];
  const remove = withCounts.slice(1);

  console.log(`Mantener categoría ${keep.id} - ${keep.name} (${keep.count} productos)`);
  if (remove.length === 0) {
    console.log('No hay categorías para eliminar.');
    return;
  }
  console.log('Eliminar categorías:', remove.map(c => `${c.id}(${c.count})`).join(', '));

  // Reasignar productos de las categorías a eliminar hacia la que se mantiene
  for (const cat of remove) {
    const updated = await prisma.product.updateMany({
      where: { categoryId: cat.id },
      data: { categoryId: keep.id }
    });
    console.log(`Reasignados ${updated.count} productos de ${cat.id} -> ${keep.id}`);
  }

  // Eliminar categorías duplicadas
  for (const cat of remove) {
    await prisma.category.delete({ where: { id: cat.id } });
    console.log(`Eliminada categoría duplicada ${cat.id}`);
  }

  // Reporte final
  const finalCount = await prisma.product.count({ where: { categoryId: keep.id } });
  console.log(`Categoría ${keep.id} ahora tiene ${finalCount} productos.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
