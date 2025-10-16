// Script para limpiar productos con categorías no válidas
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Categorías válidas
  const validCategories = ['Ojos', 'Labios', 'Rostro', 'Uñas'];
  
  // Obtener todas las categorías
  const allCategories = await prisma.category.findMany();
  
  // Filtrar categorías no válidas
  const invalidCategories = allCategories.filter(cat => !validCategories.includes(cat.name));
  
  console.log(`Categorías a eliminar: ${invalidCategories.map(c => c.name).join(', ')}`);
  
  // Eliminar productos de categorías no válidas
  for (const cat of invalidCategories) {
    const deletedProducts = await prisma.product.deleteMany({
      where: { categoryId: cat.id }
    });
    console.log(`Eliminados ${deletedProducts.count} productos de la categoría ${cat.name}`);
    
    // Eliminar la categoría
    await prisma.category.delete({ where: { id: cat.id } });
    console.log(`Categoría ${cat.name} eliminada`);
  }
  
  console.log('Limpieza completada!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
