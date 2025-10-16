import { Product } from '../types/Product'

export const products: Product[] = [
  // Productos para Ojos
  {
    id: 'eyes-001',
    name: 'Paleta de Sombras Sunset',
    description: 'Paleta de 12 tonos cálidos inspirados en el atardecer, incluye mates y brillantes',
    price: 89900,
    category: 'ojos',
    image: 'https://images.unsplash.com/photo-1583241475880-083f84372725',
    stock: 15,
    brand: 'LW Cosmetics',
    featured: true
  },
  {
    id: 'eyes-002',
    name: 'Máscara de Pestañas Volume Plus',
    description: 'Máscara de pestañas con efecto volumen dramático y larga duración',
    price: 45900,
    category: 'ojos',
    image: 'https://images.unsplash.com/photo-1631214524020-8c9c7f554d7d',
    stock: 20,
    brand: 'LW Cosmetics'
  },
  {
    id: 'eyes-003',
    name: 'Delineador Líquido Pro',
    description: 'Delineador líquido de alta precisión resistente al agua',
    price: 35900,
    category: 'ojos',
    image: 'https://images.unsplash.com/photo-1631214524020-8c9c7f554d7d',
    stock: 25,
    brand: 'LW Cosmetics'
  },
  {
    id: 'eyes-004',
    name: 'Paleta de Sombras Glam Night',
    description: 'Paleta con 15 tonos brillantes y metálicos para looks de noche',
    price: 99900,
    category: 'ojos',
    image: 'https://images.unsplash.com/photo-1583241475880-083f84372725',
    stock: 12,
    brand: 'LW Cosmetics'
  },
  {
    id: 'eyes-005',
    name: 'Máscara de Pestañas Waterproof',
    description: 'Máscara a prueba de agua con efecto alargador',
    price: 48900,
    category: 'ojos',
    image: 'https://images.unsplash.com/photo-1631214524020-8c9c7f554d7d',
    stock: 18,
    brand: 'LW Cosmetics'
  },
  {
    id: 'eyes-006',
    name: 'Delineador en Gel Negro',
    description: 'Delineador en gel de larga duración con pincel incluido',
    price: 42900,
    category: 'ojos',
    image: 'https://images.unsplash.com/photo-1631214524020-8c9c7f554d7d',
    stock: 15,
    brand: 'LW Cosmetics'
  },
  {
    id: 'eyes-007',
    name: 'Sombra Líquida Shimmer',
    description: 'Sombra líquida de secado rápido con acabado brillante',
    price: 38900,
    category: 'ojos',
    image: 'https://images.unsplash.com/photo-1583241475880-083f84372725',
    stock: 20,
    brand: 'LW Cosmetics'
  },
  {
    id: 'eyes-008',
    name: 'Paleta de Sombras Natural',
    description: 'Paleta de 12 tonos neutros para looks naturales',
    price: 85900,
    category: 'ojos',
    image: 'https://images.unsplash.com/photo-1583241475880-083f84372725',
    stock: 14,
    brand: 'LW Cosmetics'
  },
  {
    id: 'eyes-009',
    name: 'Delineador en Lápiz Marrón',
    description: 'Delineador en lápiz de tono marrón con difuminador',
    price: 28900,
    category: 'ojos',
    image: 'https://images.unsplash.com/photo-1631214524020-8c9c7f554d7d',
    stock: 22,
    brand: 'LW Cosmetics'
  },
  {
    id: 'eyes-010',
    name: 'Kit de Cejas Pro',
    description: 'Kit completo para cejas con polvos, cera y pinceles',
    price: 65900,
    category: 'ojos',
    image: 'https://images.unsplash.com/photo-1583241475880-083f84372725',
    stock: 10,
    brand: 'LW Cosmetics'
  },
  {
    id: 'eyes-002',
    name: 'Máscara de Pestañas Volumen',
    description: 'Máscara para pestañas con efecto volumen y longitud',
    price: 45900,
    category: 'ojos',
    image: 'https://images.unsplash.com/photo-1631214524020-8c9c7f554d7d',
    stock: 20,
    brand: 'LW Cosmetics'
  },
  {
    id: 'eyes-003',
    name: 'Delineador Líquido Negro',
    description: 'Delineador de ojos de larga duración resistente al agua',
    price: 35900,
    category: 'ojos',
    image: 'https://images.unsplash.com/photo-1631214524020-8c9c7f554d7d',
    stock: 25,
    brand: 'LW Cosmetics'
  },

  // Productos para Labios
  {
    id: 'lips-001',
    name: 'Labial Mate Red Velvet',
    description: 'Labial mate de larga duración en tono rojo profundo',
    price: 42900,
    category: 'labios',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa',
    stock: 18,
    brand: 'LW Cosmetics',
    featured: true
  },
  {
    id: 'lips-002',
    name: 'Brillo Labial Diamond',
    description: 'Brillo labial con partículas brillantes y efecto voluminizador',
    price: 35900,
    category: 'labios',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa',
    stock: 20,
    brand: 'LW Cosmetics'
  },
  {
    id: 'lips-003',
    name: 'Kit de Labiales Nude',
    description: 'Set de 4 labiales en tonos nude para todo tipo de piel',
    price: 89900,
    category: 'labios',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa',
    stock: 15,
    brand: 'LW Cosmetics'
  },
  {
    id: 'lips-004',
    name: 'Tinta Labial Rose',
    description: 'Tinta labial de larga duración en tono rosado natural',
    price: 38900,
    category: 'labios',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa',
    stock: 22,
    brand: 'LW Cosmetics'
  },
  {
    id: 'lips-005',
    name: 'Bálsamo Labial Hidratante',
    description: 'Bálsamo con color y protección solar FPS 15',
    price: 28900,
    category: 'labios',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa',
    stock: 25,
    brand: 'LW Cosmetics'
  },
  {
    id: 'lips-006',
    name: 'Labial Líquido Mate Berry',
    description: 'Labial líquido mate en tono berry intenso',
    price: 45900,
    category: 'labios',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa',
    stock: 16,
    brand: 'LW Cosmetics'
  },
  {
    id: 'lips-007',
    name: 'Delineador Labial Universal',
    description: 'Delineador transparente para evitar el sangrado del labial',
    price: 32900,
    category: 'labios',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa',
    stock: 20,
    brand: 'LW Cosmetics'
  },
  {
    id: 'lips-008',
    name: 'Set de Mini Labiales',
    description: 'Set de 6 mini labiales en tonos variados',
    price: 75900,
    category: 'labios',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa',
    stock: 12,
    brand: 'LW Cosmetics'
  },
  {
    id: 'lips-009',
    name: 'Labial Mate Coral',
    description: 'Labial mate en tono coral perfecto para el verano',
    price: 42900,
    category: 'labios',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa',
    stock: 18,
    brand: 'LW Cosmetics'
  },
  {
    id: 'lips-010',
    name: 'Aceite Labial Nutritivo',
    description: 'Aceite labial con vitamina E y aceite de jojoba',
    price: 35900,
    category: 'labios',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa',
    stock: 20,
    brand: 'LW Cosmetics'
  },
  {
    id: 'lips-002',
    name: 'Brillo Labial Hidratante',
    description: 'Brillo labial con efecto hidratante y acabado glossy',
    price: 32900,
    category: 'labios',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa',
    stock: 22,
    brand: 'LW Cosmetics'
  },
  {
    id: 'lips-003',
    name: 'Set de Labiales Nude',
    description: 'Set de 3 labiales en tonos nude',
    price: 79900,
    category: 'labios',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa',
    stock: 12,
    brand: 'LW Cosmetics'
  },

  // Productos para Rostro
  {
    id: 'face-001',
    name: 'Base de Maquillaje HD Pro',
    description: 'Base de alta cobertura con tecnología HD y acabado natural',
    price: 89900,
    category: 'rostro',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da',
    stock: 15,
    brand: 'LW Cosmetics',
    featured: true
  },
  {
    id: 'face-002',
    name: 'Corrector Líquido Perfection',
    description: 'Corrector de alta cobertura con tratamiento anti-ojeras',
    price: 45900,
    category: 'rostro',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da',
    stock: 20,
    brand: 'LW Cosmetics'
  },
  {
    id: 'face-003',
    name: 'Polvo Translúcido Mate',
    description: 'Polvo fijador ultra fino con efecto mate natural',
    price: 55900,
    category: 'rostro',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da',
    stock: 18,
    brand: 'LW Cosmetics'
  },
  {
    id: 'face-004',
    name: 'Iluminador Líquido Glow',
    description: 'Iluminador líquido con partículas nacaradas',
    price: 48900,
    category: 'rostro',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da',
    stock: 22,
    brand: 'LW Cosmetics'
  },
  {
    id: 'face-005',
    name: 'Rubor Compacto Duo',
    description: 'Duo de rubores mate y satinado',
    price: 52900,
    category: 'rostro',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da',
    stock: 16,
    brand: 'LW Cosmetics'
  },
  {
    id: 'face-006',
    name: 'Bronceador Natural Glow',
    description: 'Bronceador con acabado natural y vitamina E',
    price: 58900,
    category: 'rostro',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da',
    stock: 14,
    brand: 'LW Cosmetics'
  },
  {
    id: 'face-007',
    name: 'Primer Matificante',
    description: 'Pre-base matificante con control de brillo 24h',
    price: 62900,
    category: 'rostro',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da',
    stock: 20,
    brand: 'LW Cosmetics'
  },
  {
    id: 'face-008',
    name: 'BB Cream con FPS 50',
    description: 'BB Cream con alta protección solar y cobertura media',
    price: 65900,
    category: 'rostro',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da',
    stock: 18,
    brand: 'LW Cosmetics'
  },
  {
    id: 'face-009',
    name: 'Paleta Contorno Pro',
    description: 'Paleta profesional para contorno y bronceado',
    price: 79900,
    category: 'rostro',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da',
    stock: 12,
    brand: 'LW Cosmetics'
  },
  {
    id: 'face-010',
    name: 'Fijador de Maquillaje',
    description: 'Spray fijador de maquillaje de larga duración',
    price: 42900,
    category: 'rostro',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da',
    stock: 25,
    brand: 'LW Cosmetics'
  },
  {
    id: 'face-002',
    name: 'Corrector Líquido',
    description: 'Corrector de alta cobertura para ojeras e imperfecciones',
    price: 45900,
    category: 'rostro',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da',
    stock: 20,
    brand: 'LW Cosmetics'
  },
  {
    id: 'face-003',
    name: 'Polvo Compacto Translúcido',
    description: 'Polvo matificante de larga duración',
    price: 55900,
    category: 'rostro',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da',
    stock: 18,
    brand: 'LW Cosmetics'
  },

  // Productos para Uñas
  {
    id: 'nail-001',
    name: 'Esmalte Gel Rosa Nude',
    description: 'Esmalte efecto gel de larga duración en tono rosa nude',
    price: 25900,
    category: 'unas',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b',
    stock: 25,
    brand: 'LW Cosmetics',
    featured: true
  },
  {
    id: 'nail-002',
    name: 'Kit Manicura Profesional',
    description: 'Kit completo con herramientas para manicura profesional',
    price: 89900,
    category: 'unas',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b',
    stock: 10,
    brand: 'LW Cosmetics'
  },
  {
    id: 'nail-003',
    name: 'Top Coat Ultra Brillo',
    description: 'Top coat con máximo brillo y protección UV',
    price: 32900,
    category: 'unas',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b',
    stock: 20,
    brand: 'LW Cosmetics'
  },
  {
    id: 'nail-004',
    name: 'Set Esmaltes Neón',
    description: 'Set de 6 esmaltes en colores neón vibrantes',
    price: 75900,
    category: 'unas',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b',
    stock: 15,
    brand: 'LW Cosmetics'
  },
  {
    id: 'nail-005',
    name: 'Base Coat Fortalecedor',
    description: 'Base protectora con vitaminas para uñas débiles',
    price: 28900,
    category: 'unas',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b',
    stock: 22,
    brand: 'LW Cosmetics'
  },
  {
    id: 'nail-006',
    name: 'Esmalte Gel Glitter',
    description: 'Esmalte efecto gel con purpurina holográfica',
    price: 29900,
    category: 'unas',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b',
    stock: 18,
    brand: 'LW Cosmetics'
  },
  {
    id: 'nail-007',
    name: 'Kit Poly Gel',
    description: 'Kit completo para extensiones de uñas con poly gel',
    price: 149900,
    category: 'unas',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b',
    stock: 8,
    brand: 'LW Cosmetics'
  },
  {
    id: 'nail-008',
    name: 'Set Decoración Nail Art',
    description: 'Set con pedrería, stickers y accesorios para nail art',
    price: 45900,
    category: 'unas',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b',
    stock: 12,
    brand: 'LW Cosmetics'
  },
  {
    id: 'nail-009',
    name: 'Aceite Nutritivo Cutículas',
    description: 'Aceite nutritivo con almendras para cutículas',
    price: 22900,
    category: 'unas',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b',
    stock: 30,
    brand: 'LW Cosmetics'
  },
  {
    id: 'nail-010',
    name: 'Removedor Gel UV',
    description: 'Removedor profesional para esmaltes gel y acrílico',
    price: 35900,
    category: 'unas',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b',
    stock: 20,
    brand: 'LW Cosmetics'
  },
  {
    id: 'nail-002',
    name: 'Kit de Manicura',
    description: 'Kit completo para manicura profesional',
    price: 65900,
    category: 'unas',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b',
    stock: 10,
    brand: 'LW Cosmetics'
  },
  {
    id: 'nail-003',
    name: 'Top Coat Brillo',
    description: 'Top coat con efecto ultra brillante',
    price: 29900,
    category: 'unas',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b',
    stock: 20,
    brand: 'LW Cosmetics'
  }
];