// Script para agregar productos de Ojos desde Magna Cosmetics
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  let ojos = await prisma.category.findFirst({ where: { name: 'Ojos' } });
  if (!ojos) {
    ojos = await prisma.category.create({ data: { name: 'Ojos' } });
  }

  // Limpia productos existentes para evitar duplicados
  await prisma.product.deleteMany({ where: { categoryId: ojos.id } });

  const productos = [
    {
      name: 'Pestañina Pastel A Prueba De Agua PPL1754 Trendy',
      description: 'Pestañina Trendy Pastel a Prueba de Agua brinda volumen, definición y color con un acabado delicado y femenino. Fórmula waterproof que curva y define sin grumos.',
      price: 15300,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/10/4907gi.jpg',
    },
    {
      name: 'Pestañina Barbie Vaquera MT2379 Trendy',
      description: 'Pestañina Trendy Barbie Vaquera alarga, define y da volumen desde la primera aplicación. Cepillo de precisión, fórmula de larga duración resistente al sudor y humedad.',
      price: 12700,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/10/4907gh.jpg',
    },
    {
      name: 'Serum Líquido Hidratante De Cejas Y Pestañas Lula',
      description: 'Serum líquido hidratante para cejas y pestañas Lula. Fortalece, hidrata y mejora la apariencia del vello. Fórmula ligera de rápida absorción con péptidos y activos humectantes.',
      price: 33000,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/10/710714.jpg',
    },
    {
      name: 'Delineador Pincel Negro 15160 Prosa',
      description: 'Delineador pincel negro 15160 Prosa. Trazo intenso, preciso y duradero. Fórmula con ingredientes naturales, acabado profesional y resistente.',
      price: 17900,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/10/0w0725.jpg',
    },
    {
      name: 'Color Studio Beauty Glazed',
      description: 'Paleta de 35 colores mate y satinados de excelente pigmentación.',
      price: 55000,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/09/50077r.png',
    },
    {
      name: 'Lapiz Para Cejas Beauty Glazed Profesional Doble Punta B69',
      description: 'Lápiz para cejas doble punta, define, rellena y da acabado natural. Aplicación suave y precisa, resistente al agua y sudor.',
      price: 20000,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/09/50078j.jpg',
    },
    {
      name: 'Paleta de Sombras Bloom Nude Allure BL-SP4135 Bloomshell',
      description: 'Paleta con 15 tonos versátiles (12 mate, 3 cremosos) para looks naturales y sofisticados. Textura suave y fácil de difuminar.',
      price: 42000,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/09/ab0730.jpg',
    },
    {
      name: 'Pincel Perfect Ojos Bloomshell BL-BP00829',
      description: 'Brocha multifuncional para maquillaje de ojos, ideal para aplicar y difuminar sombras con precisión profesional.',
      price: 16000,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/09/pincel-perfect-ojos-bloomshell-bl-bp00829.jpg',
    },
    {
      name: 'Cloud Palette Sombras Ojos 10g CPT1252',
      description: 'Paleta compacta con tonos mate y satinados, pigmentación construible, ideal para looks diarios o sofisticados.',
      price: 35000,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/08/4907ge-1.jpg',
    },
    {
      name: 'Delineador Automático de Cejas Atenea 0.09g',
      description: 'Lápiz retráctil 2 en 1 con punta ultra precisa y spoolie integrado, resistente al agua, para cejas definidas y prolijas.',
      price: 35000,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/08/0407bw.jpg',
    },
    {
      name: 'Lapiz Definidor Para Cejas Lula',
      description: 'Herramienta 3 en 1 para dar forma, rellenar y definir cejas. Textura cremosa, incluye sacapuntas y cepillo spoolie.',
      price: 8500,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/08/71079m.jpg',
    },
    {
      name: 'Pegante Pestañas Trasparentes Lula',
      description: 'Pegante transparente de secado rápido y textura ligera, acabado natural y fijación duradera sin residuos.',
      price: 14300,
      imageUrl: 'https://www.magnacosmetics.co/wp-content/uploads/2025/08/71079l.jpg',
    },
  ];

  for (const producto of productos) {
    await prisma.product.create({
      data: {
        name: producto.name,
        description: producto.description,
        price: producto.price,
        imageUrl: producto.imageUrl,
        categoryId: ojos.id,
      },
    });
    console.log(`✓ Agregado: ${producto.name}`);
  }

  console.log(`\n✓ ${productos.length} productos de Ojos agregados exitosamente!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
