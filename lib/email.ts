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
                <a href="http://localhost:3001/productos" class="button">Ver Productos</a>
              </center>

              <p>Si tienes alguna pregunta, no dudes en contactarnos. ¡Estamos aquí para ayudarte!</p>
              
              <p>Saludos,<br>El equipo de LW Cosmetics 💄</p>
            </div>
            <div class="footer">
              <p>LW Cosmetics - Tu belleza, nuestra pasión</p>
              <p>Este es un correo automático, por favor no responder.</p>
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
