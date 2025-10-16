# Script de verificación pre-deploy
# Ejecuta este script antes de desplegar a Vercel

Write-Host "🔍 Verificando proyecto antes de deploy..." -ForegroundColor Cyan
Write-Host ""

# Verificar Node y npm
Write-Host "✓ Verificando Node.js..." -ForegroundColor Yellow
node --version
npm --version
Write-Host ""

# Verificar package.json
Write-Host "✓ Verificando package.json..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    Write-Host "  ✅ package.json existe" -ForegroundColor Green
} else {
    Write-Host "  ❌ package.json NO encontrado" -ForegroundColor Red
    exit 1
}

# Verificar .env
Write-Host "✓ Verificando .env..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "  ✅ .env existe" -ForegroundColor Green
    Write-Host "  ⚠️  Recuerda NO subirlo a GitHub" -ForegroundColor Yellow
} else {
    Write-Host "  ❌ .env NO encontrado" -ForegroundColor Red
}

# Verificar .gitignore
Write-Host "✓ Verificando .gitignore..." -ForegroundColor Yellow
if (Test-Path ".gitignore") {
    $gitignoreContent = Get-Content ".gitignore" -Raw
    if ($gitignoreContent -match "\.env") {
        Write-Host "  ✅ .env está en .gitignore" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  .env NO está en .gitignore" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ❌ .gitignore NO encontrado" -ForegroundColor Red
}

# Verificar Prisma
Write-Host "✓ Verificando Prisma..." -ForegroundColor Yellow
if (Test-Path "prisma/schema.prisma") {
    Write-Host "  ✅ schema.prisma existe" -ForegroundColor Green
} else {
    Write-Host "  ❌ schema.prisma NO encontrado" -ForegroundColor Red
}

# Verificar node_modules
Write-Host "✓ Verificando dependencias..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "  ✅ node_modules existe" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Ejecuta: npm install" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🧪 Intentando build..." -ForegroundColor Cyan

try {
    # Limpiar
    if (Test-Path ".next") {
        Remove-Item -Recurse -Force ".next"
    }
    
    # Instalar dependencias
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
    npm install
    
    # Generar Prisma Client
    Write-Host "🗄️  Generando Prisma Client..." -ForegroundColor Yellow
    npx prisma generate
    
    # Build
    Write-Host "🏗️  Construyendo proyecto..." -ForegroundColor Yellow
    npm run build
    
    Write-Host ""
    Write-Host "✅ ¡BUILD EXITOSO!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Tu proyecto está listo para Vercel" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Próximos pasos:" -ForegroundColor Yellow
    Write-Host "1. git add ." -ForegroundColor White
    Write-Host "2. git commit -m 'Ready for deployment'" -ForegroundColor White
    Write-Host "3. git push" -ForegroundColor White
    Write-Host "4. Importar en Vercel: https://vercel.com/new" -ForegroundColor White
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "❌ BUILD FALLÓ" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Revisa los errores arriba antes de desplegar" -ForegroundColor Yellow
    exit 1
}

Write-Host "📋 Checklist final:" -ForegroundColor Cyan
Write-Host "  [ ] ¿Tu código está en GitHub?" -ForegroundColor White
Write-Host "  [ ] ¿Tienes cuenta en Vercel?" -ForegroundColor White
Write-Host "  [ ] ¿Guardaste tus variables de entorno?" -ForegroundColor White
Write-Host "  [ ] ¿Configuraste EMAIL_USER y EMAIL_PASSWORD?" -ForegroundColor White
Write-Host ""
Write-Host "📖 Ver guía completa: DEPLOY_VERCEL.md" -ForegroundColor Cyan
