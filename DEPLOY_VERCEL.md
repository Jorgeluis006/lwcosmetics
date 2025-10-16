# 🚀 Guía de Despliegue en Vercel

## ✅ Requisitos Previos

- [x] Base de datos Supabase configurada
- [ ] Cuenta en GitHub
- [ ] Cuenta en Vercel (https://vercel.com)
- [ ] Código funcionando localmente

---

## 📋 Paso 1: Preparar el Proyecto

### 1.1 Verificar que todo funciona localmente

```powershell
# Instalar dependencias
npm install

# Generar Prisma Client
npx prisma generate

# Ejecutar migraciones
npx prisma migrate deploy

# Construir el proyecto
npm run build

# Probar localmente
npm run dev
```

### 1.2 Verificar archivos importantes

- ✅ `.gitignore` existe
- ✅ `.env.example` documentado
- ✅ `prisma/schema.prisma` configurado
- ✅ `package.json` con scripts correctos

---

## 📤 Paso 2: Subir a GitHub

### 2.1 Inicializar Git (si aún no lo has hecho)

```powershell
# Inicializar repositorio
git init

# Agregar archivos
git add .

# Hacer commit
git commit -m "Initial commit - Ready for deployment"
```

### 2.2 Crear repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `paginaweb1` (o el que prefieras)
3. Mantén como **privado** (para proteger tus datos)
4. NO inicialices con README (ya tienes código)
5. Click en "Create repository"

### 2.3 Conectar y subir

```powershell
# Conectar con tu repositorio (reemplaza TU_USUARIO)
git remote add origin https://github.com/TU_USUARIO/paginaweb1.git

# Renombrar rama a main
git branch -M main

# Subir código
git push -u origin main
```

---

## 🌐 Paso 3: Desplegar en Vercel

### 3.1 Importar Proyecto

1. Ve a https://vercel.com
2. Inicia sesión con GitHub
3. Click en "Add New" → "Project"
4. Selecciona tu repositorio `paginaweb1`
5. Click en "Import"

### 3.2 Configurar el Proyecto

Vercel detectará automáticamente que es Next.js. Configura:

**Framework Preset:** Next.js
**Root Directory:** ./
**Build Command:** `npm run build`
**Output Directory:** .next
**Install Command:** `npm install`

### 3.3 Agregar Variables de Entorno

En la sección "Environment Variables", agrega:

#### Variables de Base de Datos (REQUERIDAS):

```
DATABASE_URL
postgresql://postgres.lnpzhnytnnywowhoptfu:Jorgeluis00702062004@aws-1-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=10&pool_timeout=20

DIRECT_URL
postgresql://postgres.lnpzhnytnnywowhoptfu:Jorgeluis00702062004@aws-1-sa-east-1.pooler.supabase.com:5432/postgres
```

#### Variables de Email (OPCIONALES):

```
EMAIL_USER
tu_correo@gmail.com

EMAIL_PASSWORD
tu_contraseña_de_aplicacion_gmail
```

**⚠️ IMPORTANTE:** 
- Para EMAIL_PASSWORD, necesitas una "Contraseña de Aplicación" de Gmail
- Ve a: https://myaccount.google.com/apppasswords
- Genera una contraseña específica para esta app

#### Variables de Stripe (Si las tienes):

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
pk_test_... o pk_live_...

STRIPE_SECRET_KEY
sk_test_... o sk_live_...
```

### 3.4 Deploy!

1. Click en **"Deploy"**
2. Espera 2-3 minutos mientras Vercel construye tu app
3. ¡Tu sitio estará en vivo! 🎉

---

## 🔧 Paso 4: Ejecutar Migraciones en Producción

Una vez desplegado, necesitas ejecutar las migraciones:

### Opción A: Desde tu computadora (Recomendado)

```powershell
# Usar las URLs de producción
$env:DATABASE_URL="postgresql://postgres.lnpzhnytnnywowhoptfu:Jorgeluis00702062004@aws-1-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=10&pool_timeout=20"
$env:DIRECT_URL="postgresql://postgres.lnpzhnytnnywowhoptfu:Jorgeluis00702062004@aws-1-sa-east-1.pooler.supabase.com:5432/postgres"

# Ejecutar migraciones
npx prisma migrate deploy

# (Opcional) Ejecutar seed
npx prisma db seed
```

### Opción B: Usar Vercel CLI

```powershell
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Ejecutar comando en producción
vercel env pull .env.production
npx prisma migrate deploy --schema=./prisma/schema.prisma
```

---

## 🎯 Paso 5: Verificar el Despliegue

### 5.1 Probar tu sitio

1. Ve a la URL que Vercel te proporcionó (ej: `https://tu-proyecto.vercel.app`)
2. Prueba las siguientes funcionalidades:
   - [ ] Página principal carga correctamente
   - [ ] Productos se muestran
   - [ ] Login funciona
   - [ ] Registro funciona
   - [ ] Agregar al carrito funciona
   - [ ] Ver pedidos funciona
   - [ ] (Si configuraste email) Se envían notificaciones

### 5.2 Revisar Logs

Si algo falla:
1. Ve a tu proyecto en Vercel Dashboard
2. Click en "Deployments"
3. Click en el deployment más reciente
4. Ve a "Functions" para ver logs de API routes

---

## 🔐 Paso 6: Configurar Dominio Personalizado (Opcional)

Si tienes un dominio propio:

1. En Vercel Dashboard → Tu Proyecto → Settings → Domains
2. Agrega tu dominio (ej: `www.tutienda.com`)
3. Vercel te dará instrucciones de DNS
4. Configura los registros DNS en tu proveedor
5. SSL se configurará automáticamente ✅

---

## 🔄 Paso 7: Configurar Auto-Deploy

¡Ya está configurado! Cada vez que hagas `git push` a tu rama `main`, Vercel automáticamente:

1. ✅ Detecta el cambio
2. ✅ Ejecuta el build
3. ✅ Despliega la nueva versión
4. ✅ Te notifica cuando termina

```powershell
# Workflow de desarrollo:
# 1. Hacer cambios en tu código
# 2. Probar localmente: npm run dev
# 3. Commit y push:
git add .
git commit -m "Descripción de cambios"
git push

# ¡Vercel desplegará automáticamente!
```

---

## 🛠️ Comandos Útiles

### Desarrollo Local
```powershell
npm run dev              # Servidor de desarrollo
npm run build           # Construir para producción
npm start               # Servidor de producción local
npx prisma studio       # Ver base de datos
npx prisma migrate dev  # Crear nueva migración
```

### Vercel CLI
```powershell
vercel                  # Deploy a preview
vercel --prod          # Deploy a producción
vercel logs            # Ver logs
vercel env ls          # Listar variables de entorno
```

---

## ⚠️ Troubleshooting

### Error: "Prisma Client not generated"
```powershell
# Solución: Agregar en package.json (ya lo tienes)
"postinstall": "prisma generate"
```

### Error: "Database connection failed"
- Verifica que DATABASE_URL y DIRECT_URL estén correctos
- Asegúrate que Supabase permite conexiones externas
- Revisa que la contraseña no tenga caracteres especiales sin escapar

### Error: "Module not found"
```powershell
# Limpiar caché y reinstalar
rm -rf node_modules .next
npm install
npm run build
```

### Los cambios no se reflejan
- Asegúrate de hacer `git push`
- Verifica que el deployment en Vercel terminó correctamente
- Limpia caché del navegador (Ctrl+Shift+R)

---

## 📊 Costos

### Vercel (Hobby - Gratis)
- ✅ 100 GB-Hrs de ejecución
- ✅ 100 deployments/día
- ✅ HTTPS gratis
- ✅ Dominio .vercel.app gratis
- ✅ Dominios personalizados ilimitados

### Supabase (Free Tier)
- ✅ 500 MB de base de datos
- ✅ 2 GB de ancho de banda
- ✅ 50,000 usuarios activos mensuales
- ✅ Backups automáticos (7 días)

**Total: $0/mes** para empezar 🎉

---

## 📝 Checklist Final

- [ ] Código subido a GitHub
- [ ] Proyecto importado en Vercel
- [ ] Variables de entorno configuradas
- [ ] Deployment exitoso
- [ ] Migraciones ejecutadas
- [ ] Sitio funciona correctamente
- [ ] (Opcional) Dominio personalizado configurado
- [ ] (Opcional) Stripe configurado en modo producción

---

## 🚀 ¡Listo!

Tu aplicación ya está en vivo en Vercel. 

**URL:** https://tu-proyecto.vercel.app

¿Dudas? Vercel tiene excelente documentación: https://vercel.com/docs
