# Tienda demo (Next.js + TypeScript)

Proyecto minimal para una tienda con:
- Página principal (/)
- Catálogo (/productos)
- Detalle de producto (/productos/[id])
- Página de pago usando Stripe Checkout (API route /api/checkout)

Requisitos
- Node.js 18+ y npm

Instalar y ejecutar en Windows PowerShell:
```powershell
npm install
npm run dev
```

Variables de entorno (en desarrollo crea un archivo `.env.local`):
- STRIPE_SECRET_KEY=sk_test_...
- NEXT_PUBLIC_BASE_URL=http://localhost:3000

Despliegue gratuito recomendado
- Vercel: integración nativa con Next.js. Tiene plan gratuito para la mayoría de proyectos pequeños.
- Netlify: también soporta Next.js (con adaptador) y ofrece plan gratuito.

Stripe
- Usa claves de prueba (empiezan por sk_test_ y pk_test_). Revisa la documentación de Stripe para Checkout.

Siguientes pasos sugeridos
- Añadir un CMS o panel admin (Sanity, Contentful, Strapi) para gestionar productos.
- Implementar webhooks de Stripe para confirmar pagos.
