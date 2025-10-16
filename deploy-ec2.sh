#!/bin/bash
# Script para instalar y configurar la aplicación en EC2 Ubuntu

# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar PM2 para gestionar la aplicación
sudo npm install -g pm2

# Clonar repositorio (reemplaza con tu URL)
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo

# Instalar dependencias
npm install

# Crear archivo .env con tus variables
cat > .env << EOF
DATABASE_URL="tu-database-url"
DIRECT_URL="tu-direct-url"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="tu-key"
STRIPE_SECRET_KEY="tu-secret"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="tu-email@gmail.com"
EMAIL_PASSWORD="tu-password"
EMAIL_FROM="tu-email@gmail.com"
EOF

# Generar Prisma Client y ejecutar migraciones
npx prisma generate
npx prisma migrate deploy

# Construir aplicación
npm run build

# Iniciar con PM2
pm2 start npm --name "paginaweb1" -- start
pm2 startup
pm2 save

# Instalar y configurar Nginx
sudo apt install -y nginx

# Configurar Nginx como proxy reverso
sudo tee /etc/nginx/sites-available/paginaweb1 > /dev/null << 'NGINX'
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX

sudo ln -s /etc/nginx/sites-available/paginaweb1 /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

echo "¡Instalación completada! Tu aplicación está corriendo en el puerto 3000"
echo "Nginx está configurado para servir en el puerto 80"
