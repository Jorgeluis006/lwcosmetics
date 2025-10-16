// Script para agregar productos de rostro
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Buscar o crear categoría Rostro
  let rostro = await prisma.category.findFirst({ where: { name: 'Rostro' } });
  if (!rostro) {
    rostro = await prisma.category.create({ data: { name: 'Rostro' } });
  }

  // Productos de rostro con imágenes reales
  const productos = [
    {
      name: 'Iluminador Liquido Panda Ilk2286 Trendy',
      description: 'Iluminador Líquido Trendy Panda ILK2286 aporta un brillo radiante y natural a la piel. Su textura ligera se difumina fácilmente, dejando un acabado luminoso sin sensación grasosa. Perfecto para resaltar pómulos, cejas y puente de la nariz.',
      price: 10200,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/10/4908d1.jpg',
    },
    {
      name: 'Rubor En Barra Barbie Vaquera Mt2381 Trendy',
      description: 'Rubor en Barra Trendy Barbie Vaquera MT2381 tiene una textura cremosa y fácil de difuminar que deja un acabado natural y luminoso. Su fórmula ligera aporta color y frescura al rostro, ideal para un look saludable y glamuroso.',
      price: 15300,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/10/4908d2.jpg',
    },
    {
      name: 'Labi Tinta Rubor Barbie Malibu Mt2260 Trendy',
      description: 'Labi Tinta Rubor Trendy Barbie Malibu MT2260 es un tinte líquido multifuncional para labios y mejillas con acabado natural. Su fórmula ligera y de larga duración se difumina fácilmente, dejando un toque de color fresco.',
      price: 15300,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/10/4908c9.jpg',
    },
    {
      name: 'Rubor Gelatina B186 Trendy',
      description: 'Rubor Gelatina de Beauty Glazed conocido por su larga duración y tonos hermosos. Su fórmula es acuosa y ligera, de increíble pigmentación resistente al agua. Pigmentación increíble, de fácil aplicación y excelente duración.',
      price: 15000,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/10/4908c8.jpg',
    },
    {
      name: 'Polvo Suelto Profesional Purpure',
      description: 'Polvo suelto profesional purpure sella tu maquillaje con un acabado mate, natural y duradero. Su fórmula ultraligera controla el brillo sin resecar la piel, dejando una textura suave y aterciopelada ideal para todo tipo de cutis.',
      price: 25000,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/10/0d0818.jpg',
    },
    {
      name: 'Rubor Lucky Trendy Baked Duo Corazon Rht2202',
      description: 'Lucky Rubor Baked Duo Corazon es un duo de rubores en polvo con forma de corazon que aporta color y frescura a las mejillas con un acabado mate de apariencia natural. Textura suave y aterciopelada que se difumina sin esfuerzo.',
      price: 15000,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/09/4908c7.jpg',
    },
    {
      name: 'Repuesto Bloom Cushion Blfc115 Bloomshell',
      description: 'Magna Cosmetics Bloom Cushion Replacement es un repuesto de base cushion con formula de inspiracion coreana que unifica el tono y deja un acabado radiante y natural. Combina 60% de ingredientes de cuidado (centella asiatica y colageno).',
      price: 15000,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/09/bloom-cushion-replacement.jpg',
    },
    {
      name: 'Amuse Rubor Bloom Crush Bl-R117 Bloomshell',
      description: 'Amuse Rubor Crush BL-R117 Bloomshell es un rubor de textura cremosa que, al contacto con la piel, se transforma en un efecto en polvo suave. Se desliza facilmente y deja un acabado natural sin marcar textura.',
      price: 20000,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/09/amuse-rubor-crush-bl-r117-bloomshell.jpg',
    },
    {
      name: 'Mini Fix Fijador En Spray Bloomshell 46Ml Bl-Sf33133',
      description: 'Mini Fix Fijador en Spray Bloomshell es un sellante en aerosol de tamaño práctico que prolonga la duración del maquillaje. Su fórmula con aloe vera hidrata la piel y mantiene un acabado impecable durante todo el día.',
      price: 26900,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/09/ab0848.jpg',
    },
    {
      name: 'Bloom Fix Fijador En Spray Bloomshell 120Ml Bl-Sf2543',
      description: 'Fix Fijador en Spray Bloomshell es un sellante en aerosol diseñado para prolongar la duración de tu maquillaje. Su fórmula con aloe vera hidrata y cuida la piel mientras mantiene un acabado uniforme y duradero durante todo el día.',
      price: 45000,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/09/ab0847.jpg',
    },
    {
      name: 'Bloom Mist Fix Fijador Hidratante Bl-Sh805647 100Ml Bloomshell',
      description: 'Mist Fix Hidratante Bloomshell es un spray fijador e hidratante que refresca la piel y prolonga la duración del maquillaje. Su fórmula ligera aporta frescura inmediata, manteniendo el rostro con un aspecto radiante y natural.',
      price: 26000,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/09/ab0846.jpg',
    },
  ];

  for (const producto of productos) {
    await prisma.product.create({
      data: {
        name: producto.name,
        description: producto.description,
        price: producto.price,
        imageUrl: producto.imageUrl,
        categoryId: rostro.id,
      },
    });
    console.log(`✓ Agregado: ${producto.name}`);
  }

  console.log(`\n✓ ${productos.length} productos de rostro agregados exitosamente!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
