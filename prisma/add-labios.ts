// Script para agregar productos de labios
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Buscar o crear categoría Labios
  let labios = await prisma.category.findFirst({ where: { name: 'Labios' } });
  if (!labios) {
    labios = await prisma.category.create({ data: { name: 'Labios' } });
  }

  // Productos de labios con imágenes reales
  const productos = [
    {
      name: 'Labi Gloss Barbie Vaquera Mt2382 Trendy',
      description: 'Labial Gloss Trendy Barbie Vaquera MT2382 ofrece brillo intenso con textura ligera y no pegajosa. Deja los labios suaves, nutridos y con efecto volumen para un acabado glamuroso inspirado en el estilo Barbie Vaquera.',
      price: 12700,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/10/4906d3.jpg',
    },
    {
      name: 'Juicy Lips Montoc Brillo Labial Con Acido Hialuronico',
      description: 'Montoc Juicy Lips Brillo Labial con Acido Hialuronico es un gloss hidratante de textura ligera y no pegajosa que aporta un acabado jugoso y luminoso. Con acido hialuronico para hidratacion y suavidad.',
      price: 25000,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/09/280617.jpg',
    },
    {
      name: 'Brillo Labial Lips Gloss Radiant Kiss Ruby Rose',
      description: 'Brillo labial ruby rose rk20 radiant kiss aporta un acabado luminoso y confortable. Acabado radiante y no pegajoso, textura ligera de uso diario.',
      price: 19600,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/09/73060f.jpg',
    },
    {
      name: 'Blooming Jelly Brillo Hidratante Bl-Bg2622 Bloomshell',
      description: 'Blooming Jelly Caramelized es un brillo labial hidratante con textura gelatinosa que nutre profundamente tus labios, dejándolos suaves y saludables. Aporta un acabado translúcido con efecto volumen y delicioso aroma dulce.',
      price: 18000,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/09/ab0660.jpg',
    },
    {
      name: 'Bloom Duo Perfect Bl-Blk11390 Bloomshell',
      description: 'Bloom Duo Perfect Lip Oil es la solución ideal para lograr unos labios irresistibles, suaves y radiantes. Formulado con aceite de jojoba y colágeno para una hidratación profunda.',
      price: 22000,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/09/bloom-duo-perfect-lip-oil-bl-blk11390.jpg',
    },
    {
      name: 'Lip Gloss Bloom Chic Bl-7110 Bloomshell',
      description: 'Lip Gloss Bloom Chic es un brillo labial hidratante con efecto multicolor que aporta un acabado único y vibrante a tus labios. Colores dicromáticos que juegan con la luz para un look llamativo.',
      price: 16000,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/09/ab0661.jpg',
    },
    {
      name: 'Lip Bloom Luscious Voluminizador Bl-Blo110897 Bloomshell',
      description: 'Lip Bloom Luscious Voluminizador transforma tus labios al instante, aportando efecto volumen e hidratación profunda. Fórmula ligera con ingredientes que nutren y suavizan, con micropartículas de brillo.',
      price: 16000,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/09/ab0659.jpg',
    },
    {
      name: 'Lip Bloom Cherry Bl-Bc12841 Bloomshell',
      description: 'Lip Bloom Cherry es un aceite labial con aroma a cereza que hidrata y nutre profundamente los labios. Fórmula ligera con acabado translúcido y sutil tono cherry.',
      price: 16000,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/09/ab0658.jpg',
    },
    {
      name: 'Lipgloss Minnie Mouse Miis Cosmetics',
      description: 'Lip gloss Minnie Mouse MIIS Cosmetics ofrece un acabado luminoso y radiante. Brillo espectacular sin sensacion pegajosa. Packaging coleccionable inspirado en Minnie Mouse.',
      price: 18800,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/09/2606af.jpg',
    },
    {
      name: 'Lip Oil Tinted Atenea 5 Ml',
      description: 'Lip Oil Tinted es un aceite labial ligero con un toque de color natural que deja los labios jugosos, suaves y con efecto refrescante. Con aceite de jojoba y semilla de girasol para hidratar profundamente.',
      price: 36000,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/08/04060g.jpg',
    },
  ];

  for (const producto of productos) {
    await prisma.product.create({
      data: {
        name: producto.name,
        description: producto.description,
        price: producto.price,
        imageUrl: producto.imageUrl,
        categoryId: labios.id,
      },
    });
    console.log(`✓ Agregado: ${producto.name}`);
  }

  console.log(`\n✓ ${productos.length} productos de labios agregados exitosamente!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
