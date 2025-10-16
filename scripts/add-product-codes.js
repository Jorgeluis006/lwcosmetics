const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Genera códigos aleatorios para los productos
function generateSKU() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const nums = Math.floor(1000 + Math.random() * 9000)
  const lett = letters[Math.floor(Math.random() * letters.length)] + letters[Math.floor(Math.random() * letters.length)]
  return `${nums}${lett.toLowerCase()}`
}

function generateBarcode() {
  return Math.floor(1000000 + Math.random() * 9000000).toString()
}

function generateReference() {
  const prefix = 'PPL'
  const nums = Math.floor(1000 + Math.random() * 9000)
  return `${prefix}${nums}`
}

async function main() {
  console.log('Agregando códigos a los productos...')
  
  // Obtener todos los productos
  const products = await prisma.product.findMany()
  
  // Actualizar cada producto con códigos
  for (const product of products) {
    await prisma.product.update({
      where: { id: product.id },
      data: {
        sku: generateSKU(),
        barcode: generateBarcode(),
        reference: generateReference()
      }
    })
    console.log(`✓ Producto ${product.id}: ${product.name} actualizado`)
  }
  
  console.log(`\n✅ ${products.length} productos actualizados con códigos`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
