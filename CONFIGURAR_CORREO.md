# 📧 Guía de Configuración de Correo para LW Cosmetics

## 🚀 Paso 1: Crear una Cuenta de Gmail (o usar una existente)

Si no tienes una cuenta de Gmail dedicada para tu tienda, es recomendable crear una nueva.

## 🔐 Paso 2: Generar una Contraseña de Aplicación de Gmail

**IMPORTANTE:** No uses tu contraseña normal de Gmail. Debes usar una "Contraseña de aplicación".

### Pasos para generar la contraseña:

1. Ve a tu cuenta de Google: https://myaccount.google.com/
2. En el menú lateral, selecciona **"Seguridad"**
3. En la sección "Cómo inicias sesión en Google", asegúrate de tener activada la **Verificación en 2 pasos**
   - Si no la tienes, actívala primero
4. Una vez activada la verificación en 2 pasos, busca **"Contraseñas de aplicaciones"**
5. Haz clic en **"Contraseñas de aplicaciones"**
6. Selecciona:
   - **App:** Correo
   - **Dispositivo:** Otro (nombre personalizado)
   - Escribe: "LW Cosmetics" o "Tienda Online"
7. Haz clic en **"Generar"**
8. Google te mostrará una contraseña de 16 caracteres (algo como: `abcd efgh ijkl mnop`)
9. **COPIA ESTA CONTRASEÑA** (sin espacios)

## ⚙️ Paso 3: Configurar el archivo .env

Abre el archivo `.env` en la raíz del proyecto y actualiza estas líneas:

```properties
# Variables de entorno para configuración de correo
EMAIL_USER=tucorreo@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
```

Reemplaza:
- `tucorreo@gmail.com` → Tu correo de Gmail real
- `abcdefghijklmnop` → La contraseña de aplicación que generaste (sin espacios)

## 🧪 Paso 4: Probar el Envío de Correos

1. Guarda el archivo `.env`
2. Reinicia el servidor (detén con Ctrl+C y ejecuta `npm run dev`)
3. Registra un nuevo usuario en tu aplicación
4. Revisa el correo que usaste para registrarte

## ✅ Ejemplo de Configuración

```properties
EMAIL_USER=lwcosmetics.tienda@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

## 🔧 Alternativas a Gmail

Si prefieres usar otro servicio de correo:

### Outlook/Hotmail:
```javascript
service: 'outlook'
EMAIL_USER=tucorreo@outlook.com
EMAIL_PASSWORD=tu_contraseña
```

### Yahoo:
```javascript
service: 'yahoo'
EMAIL_USER=tucorreo@yahoo.com
EMAIL_PASSWORD=tu_contraseña
```

### Gmail Workspace (G Suite):
```javascript
service: 'gmail'
EMAIL_USER=tucorreo@tudominio.com
EMAIL_PASSWORD=contraseña_de_aplicacion
```

## ❗ Solución de Problemas

### Error: "Invalid login: 535-5.7.8 Username and Password not accepted"
- ✅ Verifica que hayas activado la verificación en 2 pasos
- ✅ Asegúrate de usar la contraseña de aplicación, NO tu contraseña normal
- ✅ Copia la contraseña sin espacios
- ✅ Reinicia el servidor después de modificar el .env

### El correo no llega:
- ✅ Revisa la carpeta de SPAM
- ✅ Verifica que el correo en .env sea correcto
- ✅ Mira los logs del servidor para ver errores

### Error de autenticación:
- ✅ Genera una nueva contraseña de aplicación
- ✅ Verifica que el servicio sea 'gmail' en el código
- ✅ Asegúrate de que la cuenta no tenga restricciones

## 📝 Notas Importantes

1. **Seguridad:** NUNCA compartas tu contraseña de aplicación
2. **Git:** El archivo `.env` ya está en `.gitignore`, así que no se subirá a GitHub
3. **Producción:** En producción (Vercel), debes agregar estas variables en la configuración del proyecto

## 🎉 ¿Todo listo?

Una vez configurado, cada vez que un usuario se registre, recibirá automáticamente un correo de bienvenida profesional con:

- ✨ Diseño atractivo con los colores de tu marca
- 🎁 Mensaje de bienvenida personalizado
- 🛍️ Beneficios de ser cliente
- 🔗 Enlaces a tu tienda

¡Disfruta de tu sistema de correos automatizado! 📧✨
