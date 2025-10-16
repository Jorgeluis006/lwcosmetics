import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create categories
  const categories = [
    { name: 'Ojos' },
    { name: 'Labios' },
    { name: 'Rostro' },
    { name: 'Uñas' }
  ]

  console.log('Creating categories...')
  
  // Delete existing data
  await prisma.product.deleteMany({})
  await prisma.category.deleteMany({})
  
  // Create fresh categories
  const ojos = await prisma.category.create({ data: { name: 'Ojos' } })
  const labios = await prisma.category.create({ data: { name: 'Labios' } })
  const rostro = await prisma.category.create({ data: { name: 'Rostro' } })
  const unas = await prisma.category.create({ data: { name: 'Uñas' } })

  if (!ojos || !labios || !rostro || !unas) {
    throw new Error('Categories not found')
  }

  // Sample products
  const products = [
    // Ojos
    {
      name: 'Máscara de Pestañas Volumen Extremo',
      description: 'Máscara de pestañas con efecto volumen extremo',
      price: 24.99,
      imageUrl: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=500',
      categoryId: ojos.id,
      sku: 'MSC-001',
      barcode: '7501234567890',
      reference: 'VOL-EXT-001'
    },
    {
      name: 'Delineador Líquido Negro Intenso',
      description: 'Delineador líquido con acabado mate',
      price: 18.99,
      imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500',
      categoryId: ojos.id,
      sku: 'DEL-002',
      barcode: '7501234567891',
      reference: 'LIQ-NEG-002'
    },
    {
      name: 'Paleta de Sombras Nude',
      description: 'Paleta de 12 sombras en tonos nude',
      price: 32.99,
      imageUrl: 'https://images.unsplash.com/photo-1583001308836-aad56b1dfac6?w=500',
      categoryId: ojos.id,
      sku: 'PAL-003',
      barcode: '7501234567892',
      reference: 'SOM-NUD-003'
    },
    // Labios
    {
      name: 'Labial Mate Rosa Clásico',
      description: 'Labial mate de larga duración',
      price: 16.99,
      imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500',
      categoryId: labios.id,
      sku: 'LAB-004',
      barcode: '7501234567893',
      reference: 'MAT-ROS-004'
    },
    {
      name: 'Gloss Labial Transparente',
      description: 'Brillo labial con acabado cristalino',
      price: 14.99,
      imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500',
      categoryId: labios.id,
      sku: 'GLS-005',
      barcode: '7501234567894',
      reference: 'TRA-CRI-005'
    },
    {
      name: 'Tinte Labial de Larga Duración',
      description: 'Tinte labial que dura hasta 24 horas',
      price: 19.99,
      imageUrl: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=500',
      categoryId: labios.id,
      sku: 'TIN-006',
      barcode: '7501234567895',
      reference: 'DUR-24H-006'
    },
    // Rostro
    {
      name: 'Base de Maquillaje Líquida',
      description: 'Base líquida con cobertura completa',
      price: 29.99,
      imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500',
      categoryId: rostro.id,
      sku: 'BAS-007',
      barcode: '7501234567896',
      reference: 'LIQ-FUL-007'
    },
    {
      name: 'Rubor Compacto Coral',
      description: 'Rubor compacto en tono coral',
      price: 21.99,
      imageUrl: 'https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=500',
      categoryId: rostro.id,
      sku: 'RUB-008',
      barcode: '7501234567897',
      reference: 'COR-COM-008'
    },
    {
      name: 'Iluminador Facial Dorado',
      description: 'Iluminador con partículas doradas',
      price: 23.99,
      imageUrl: 'https://images.unsplash.com/photo-1625186877000-39dc3f86e4bb?w=500',
      categoryId: rostro.id,
      sku: 'ILU-009',
      barcode: '7501234567898',
      reference: 'DOR-FAC-009'
    },
    // Uñas
    {
      name: 'Esmalte de Uñas Rojo Pasión',
      description: 'Esmalte de uñas de larga duración',
      price: 9.99,
      imageUrl: 'https://images.unsplash.com/photo-1519948385320-d2a2e2324adc?w=500',
      categoryId: unas.id,
      sku: 'ESM-010',
      barcode: '7501234567899',
      reference: 'ROJ-PAS-010'
    },
    {
      name: 'Quitaesmalte Sin Acetona',
      description: 'Removedor de esmalte suave',
      price: 7.99,
      imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500',
      categoryId: unas.id,
      sku: 'REM-011',
      barcode: '7501234567900',
      reference: 'SIN-ACE-011'
    },
    {
      name: 'Set de Manicura Profesional',
      description: 'Kit completo para manicura en casa',
      price: 34.99,
      imageUrl: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=500',
      categoryId: unas.id,
      sku: 'SET-012',
      barcode: '7501234567901',
      reference: 'MAN-PRO-012'
    }
  ]

  console.log('Creating products...')
  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }

  console.log('✅ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
