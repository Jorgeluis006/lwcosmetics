// Script para agregar productos de la categoría Uñas
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const productosUnas = [
  {
    name: 'Hp004Rg Alicate Mango Metalico Golden Rose Lula',
    description: 'Alicate de mango metálico Golden Rose marca Lula. Ideal para el cuidado de las uñas.',
    price: 12800,
    imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2024/10/71093z.jpg',
  },
  {
    name: 'Hp265Sg Alicate Mango Metalico Dorado Lula',
    description: 'Alicate de mango metálico dorado marca Lula. Herramienta profesional para manicura.',
    price: 16300,
    imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2024/10/71093y.jpg',
  },
  {
    name: 'Extension De Uñas Postizas Jp-010 Lula',
    description: 'Extensión de uñas postizas modelo JP-010 marca Lula. Fácil aplicación y acabado natural.',
    price: 15900,
    imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2024/09/71093x.jpg',
  },
  {
    name: 'Extension De Uñas Postizas Jp-010P Lula',
    description: 'Extensión de uñas postizas modelo JP-010P marca Lula. Para una manicura profesional.',
    price: 15900,
    imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2024/09/71093w.jpg',
  },
  {
    name: 'Lima C10Zb Paquete X12 Pcs Curva Atenea',
    description: 'Paquete de 12 limas curvas modelo C10Zb marca Atenea. Ideal para dar forma a las uñas.',
    price: 23800,
    imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2022/02/04099n.jpg',
  },
  {
    name: 'Paquete X 100 Pcs Palo De Naranja Atenea',
    description: 'Paquete de 100 palos de naranja marca Atenea. Herramienta esencial para manicura.',
    price: 8000,
    imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2022/02/04099m.jpg',
  },
  {
    name: 'Paquete 12 Pcs Lima Fina Azul 201 Atenea',
    description: 'Paquete de 12 limas finas azules modelo 201 marca Atenea. Acabado profesional.',
    price: 9500,
    imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2022/02/04099l.jpg',
  },
  {
    name: 'Lima Profesional 100/100 (C4Gd) Atenea',
    description: 'Lima profesional 100/100 modelo C4Gd marca Atenea. Para uso profesional en manicura.',
    price: 22900,
    imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2022/01/04099k.jpg',
  },
];

async function main() {
  // Eliminar todas las variantes de la categoría 'unas'
  const variantes = ['Uñas', 'uñas', 'unas', 'UNAS', 'UÑAS', 'Unas', 'UÑAS'];
  for (const nombre of variantes) {
    const cat = await prisma.category.findFirst({ where: { name: nombre } });
    if (cat) {
      await prisma.product.deleteMany({ where: { categoryId: cat.id } });
      await prisma.category.delete({ where: { id: cat.id } });
      console.log(`Eliminada categoría previa: ${nombre}`);
    }
  }

  // Crear la categoría 'unas' desde cero
  const unas = await prisma.category.create({ data: { name: 'unas' } });
  console.log('Categoría unas creada');

  // Agregar productos a la categoría 'unas'
  for (const producto of productosUnas) {
    await prisma.product.create({
      data: {
        name: producto.name,
        description: producto.description,
        price: producto.price,
        imageUrl: producto.imageUrl,
        category: { connect: { id: unas.id } },
      },
    });
    console.log(`Agregado: ${producto.name}`);
  }
  await prisma.$disconnect();
  console.log('✓ Productos de unas agregados correctamente.');
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
});
