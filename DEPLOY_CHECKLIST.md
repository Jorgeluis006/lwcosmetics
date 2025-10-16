# Checklist de Despliegue AWS

## Antes de Desplegar

- [ ] Base de datos PostgreSQL configurada (RDS)
- [ ] Variables de entorno preparadas
- [ ] Código subido a GitHub/GitLab
- [ ] Archivo `.env.example` documentado
- [ ] Prisma migrations actualizadas
- [ ] Build local exitoso (`npm run build`)

## Configuración AWS

- [ ] Cuenta AWS activa
- [ ] RDS PostgreSQL creado
- [ ] Security Groups configurados
- [ ] AWS Amplify o EC2 configurado
- [ ] Variables de entorno agregadas en AWS

## Después del Despliegue

- [ ] Base de datos migrada (`prisma migrate deploy`)
- [ ] Seed de datos ejecutado (si aplica)
- [ ] Crear usuario admin
- [ ] Probar login
- [ ] Probar creación de pedidos
- [ ] Verificar integración Stripe
- [ ] Verificar envío de emails
- [ ] Configurar dominio personalizado
- [ ] Configurar SSL/HTTPS
- [ ] Configurar backups de BD

## Stripe en Producción

- [ ] Cambiar keys de test a producción
- [ ] Configurar webhooks de Stripe
- [ ] Probar flujo de pago completo

## Seguridad

- [ ] Cambiar passwords por defecto
- [ ] Configurar CORS apropiadamente
- [ ] Revisar Security Groups
- [ ] Habilitar logging
- [ ] Configurar alertas
