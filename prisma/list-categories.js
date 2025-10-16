const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const cats = await prisma.category.findMany();
  const out = [];
  for (const c of cats) {
    const count = await prisma.product.count({ where: { categoryId: c.id } });
    out.push({ id: c.id, name: c.name, count });
  }
  out.sort((a,b)=> a.name.localeCompare(b.name) || b.count - a.count);
  console.table(out);
}

main().catch((e)=>{console.error(e); process.exit(1)}).finally(async()=>{await prisma.$disconnect()});
