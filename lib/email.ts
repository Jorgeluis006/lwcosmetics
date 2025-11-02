import nodemailer from 'nodemailer';

// Configurar el transportador de correo
const transporter = nodemailer.createTransport({
  service: 'gmail', // Puedes usar otro servicio como outlook, yahoo, etc.
  auth: {
    user: process.env.EMAIL_USER, // Tu correo
    pass: process.env.EMAIL_PASSWORD, // Tu contraseña de aplicación
  },
});

export async function sendWelcomeEmail(name: string, email: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: '¡Bienvenido a LW Cosmetics! 💄',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f7f3ff;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background: white;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 2px 16px rgba(180, 120, 255, 0.12);
            }
            .header {
              background: linear-gradient(90deg, #b478ff 60%, #ffb6b9 100%);
              padding: 40px 20px;
              text-align: center;
              color: white;
            }
            .header h1 {
              margin: 0;
              font-size: 2rem;
            }
            .content {
              padding: 40px 30px;
            }
            .content h2 {
              color: #6c3483;
              margin-top: 0;
            }
            .content p {
              color: #666;
              line-height: 1.6;
              font-size: 1rem;
            }
            .button {
              display: inline-block;
              background: linear-gradient(90deg, #b478ff 60%, #ffb6b9 100%);
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              margin: 20px 0;
            }
            .footer {
              background: #f7f3ff;
              padding: 20px;
              text-align: center;
              color: #999;
              font-size: 0.9rem;
            }
            .benefits {
              display: flex;
              justify-content: space-around;
              margin: 30px 0;
              text-align: center;
            }
            .benefit {
              flex: 1;
              padding: 10px;
            }
            .benefit-icon {
              font-size: 2rem;
              margin-bottom: 10px;
            }
            .benefit-text {
              color: #6c3483;
              font-weight: 600;
              font-size: 0.9rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>LW Cosmetics</h1>
              <p>Tu tienda de belleza favorita</p>
            </div>
            <div class="content">
              <h2>¡Hola ${name}! 👋</h2>
              <p>¡Bienvenido a LW Cosmetics! Estamos emocionados de tenerte con nosotros.</p>
              <p>Tu cuenta ha sido creada exitosamente y ahora puedes disfrutar de todos nuestros productos de belleza de alta calidad.</p>
              
              <div class="benefits">
                <div class="benefit">
                  <div class="benefit-icon">🚚</div>
                  <div class="benefit-text">Envío gratis desde $150.000</div>
                </div>
                <div class="benefit">
                  <div class="benefit-icon">✨</div>
                  <div class="benefit-text">Productos originales</div>
                </div>
                <div class="benefit">
                  <div class="benefit-icon">💝</div>
                  <div class="benefit-text">Devolución gratis</div>
                </div>
              </div>

              <p>Explora nuestro catálogo y encuentra los mejores productos para ti.</p>
              
              <center>
                <a href="https://lwcosmetics.vercel.app/productos" class="button">Ver Productos</a>
              </center>

              <p>Si tienes alguna pregunta, contáctanos:</p>
              <p style="text-align: center;">
                📱 WhatsApp: <a href="https://wa.me/573124239687" style="color: #b478ff;">312 423 9687</a><br>
                📧 Email: lwcosmetics.tienda@gmail.com<br>
                📷 Instagram: <a href="https://www.instagram.com/lw_cosmeticsm/" style="color: #b478ff;">@lw_cosmeticsm</a>
              </p>
              
              <p>Saludos,<br>El equipo de LW Cosmetics 💄</p>
            </div>
            <div class="footer">
              <p>LW Cosmetics - Tu belleza, nuestra pasión</p>
              <p>Síguenos en redes sociales: 
                <a href="https://www.instagram.com/lw_cosmeticsm/" style="color: #b478ff;">Instagram</a> | 
                <a href="https://web.facebook.com/people/lw_cosmeticsm/100089961555463/" style="color: #b478ff;">Facebook</a>
              </p>
              <p style="font-size: 0.8rem; color: #999;">Este es un correo automático, por favor no responder.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error al enviar correo:', error);
    return { success: false, error };
  }
}

// Enviar correo de confirmación de pedido
export async function sendOrderConfirmationEmail(
  name: string, 
  email: string, 
  orderId: number,
  items: any[],
  total: number,
  shippingInfo: { direccion: string; ciudad: string; telefono: string }
) {
  const itemsHTML = items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        <img src="${item.product.imageUrl}" alt="${item.product.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; vertical-align: middle; margin-right: 10px;">
        <strong>${item.product.name}</strong>
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toLocaleString('es-CO')}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">$${(item.quantity * item.price).toLocaleString('es-CO')}</td>
    </tr>
  `).join('');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Confirmación de Pedido #${orderId} - LW Cosmetics 🛍️`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f7f3ff;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 650px;
              margin: 20px auto;
              background: white;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 2px 16px rgba(180, 120, 255, 0.12);
            }
            .header {
              background: linear-gradient(90deg, #A67356 60%, #BA8E7A 100%);
              padding: 40px 20px;
              text-align: center;
              color: white;
            }
            .header h1 {
              margin: 0;
              font-size: 2rem;
            }
            .content {
              padding: 40px 30px;
            }
            .order-number {
              background: #f0fdf4;
              border-left: 4px solid #22c55e;
              padding: 16px;
              margin: 20px 0;
              border-radius: 8px;
            }
            .order-number h2 {
              margin: 0;
              color: #16a34a;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th {
              background: #f9fafb;
              padding: 12px;
              text-align: left;
              color: #6b7280;
              font-weight: 600;
            }
            .total-row {
              background: #f0fdf4;
              font-size: 1.2rem;
            }
            .info-box {
              background: #f9fafb;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .info-box h3 {
              margin-top: 0;
              color: #A67356;
            }
            .payment-info {
              background: #fef3c7;
              border-left: 4px solid #f59e0b;
              padding: 16px;
              margin: 20px 0;
              border-radius: 8px;
            }
            .footer {
              background: #f7f3ff;
              padding: 20px;
              text-align: center;
              color: #999;
              font-size: 0.9rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ ¡Pedido Recibido!</h1>
              <p>Gracias por tu compra en LW Cosmetics</p>
            </div>
            <div class="content">
              <h2>¡Hola ${name}! 👋</h2>
              <p>Hemos recibido tu pedido y está siendo procesado. A continuación encontrarás los detalles:</p>
              
              <div class="order-number">
                <h2>Pedido #${orderId}</h2>
                <p style="margin: 5px 0 0 0; color: #6b7280;">Fecha: ${new Date().toLocaleDateString('es-CO', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
              </div>

              <h3>📦 Productos</h3>
              <table>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th style="text-align: center;">Cantidad</th>
                    <th style="text-align: right;">Precio</th>
                    <th style="text-align: right;">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHTML}
                  <tr class="total-row">
                    <td colspan="3" style="padding: 16px; text-align: right;"><strong>TOTAL:</strong></td>
                    <td style="padding: 16px; text-align: right;"><strong>$${total.toLocaleString('es-CO')}</strong></td>
                  </tr>
                </tbody>
              </table>

              <div class="info-box">
                <h3>📍 Información de Envío</h3>
                <p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Teléfono:</strong> ${shippingInfo.telefono}</p>
                <p><strong>Ciudad:</strong> ${shippingInfo.ciudad}</p>
                <p><strong>Dirección:</strong> ${shippingInfo.direccion}</p>
              </div>

              <div class="payment-info">
                <h3 style="margin-top: 0;">💳 Instrucciones de Pago</h3>
                <p><strong>Para completar tu pedido, realiza la transferencia a:</strong></p>
                <ul style="line-height: 1.8;">
                  <li><strong>Nequi:</strong> 300 347 6918 (Luisa Escobar)</li>
                  <li><strong>Davivienda - Cuenta de Ahorros:</strong> 0550002400124968 (Luisa Escobar)</li>
                </ul>
                <p style="margin-top: 16px; padding: 12px; background: white; border-radius: 6px;">
                  ⚠️ <strong>Importante:</strong> Una vez realices el pago, envía el comprobante por WhatsApp al 
                  <strong><a href="https://wa.me/573124239687" style="color: #A67356;">312 423 9687</a></strong> 
                  mencionando tu número de pedido <strong>#${orderId}</strong>
                </p>
              </div>

              <p>Recibirás una confirmación cuando procesemos tu pago y enviemos tu pedido.</p>
              
              <p>¿Necesitas ayuda? Contáctanos:</p>
              <p style="text-align: center;">
                📱 WhatsApp: <a href="https://wa.me/573124239687" style="color: #A67356;">312 423 9687</a><br>
                📧 Email: lwcosmetics.tienda@gmail.com<br>
                📷 Instagram: <a href="https://www.instagram.com/lw_cosmeticsm/" style="color: #A67356;">@lw_cosmeticsm</a>
              </p>
              
              <p>¡Gracias por confiar en nosotros! 💄</p>
              <p>El equipo de LW Cosmetics</p>
            </div>
            <div class="footer">
              <p>LW Cosmetics - Tu belleza, nuestra pasión</p>
              <p>Síguenos en redes sociales: 
                <a href="https://www.instagram.com/lw_cosmeticsm/" style="color: #A67356;">Instagram</a> | 
                <a href="https://web.facebook.com/people/lw_cosmeticsm/100089961555463/" style="color: #A67356;">Facebook</a>
              </p>
              <p style="font-size: 0.8rem; color: #999;">Este es un correo automático, por favor no responder.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error al enviar correo de confirmación de pedido:', error);
    return { success: false, error };
  }
}
