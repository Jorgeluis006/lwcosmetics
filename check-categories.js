const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkCategories() {
  try {
    const categories = await prisma.category.findMany();
    console.log('Categorías encontradas:', categories.length);
    categories.forEach(cat => {
      console.log(`- ${cat.name} (ID: ${cat.id})`);
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCategories();
