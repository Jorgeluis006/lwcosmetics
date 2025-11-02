const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '***configurada***' : 'NO CONFIGURADA');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function testEmail() {
  try {
    console.log('\nProbando conexión y envío de email...\n');
    
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Enviar al mismo correo como prueba
      subject: 'Prueba de correo - LW Cosmetics',
      html: '<h1>¡Correo de prueba funcionando!</h1><p>Si recibes este correo, la configuración está correcta.</p>',
    });

    console.log('✅ Correo enviado exitosamente!');
    console.log('Message ID:', info.messageId);
    console.log('\nRevisa tu bandeja de entrada en:', process.env.EMAIL_USER);
  } catch (error) {
    console.error('❌ Error al enviar correo:');
    console.error(error);
  }
}

testEmail();
