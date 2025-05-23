import nodemailer from 'nodemailer';

function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
  });
}

function buildMailToAdmin({ name, email, message }) {
  return {
    from: `"sudo kaffee" <${process.env.MAIL_USERNAME}>`,
    to: process.env.MAIL_USERNAME,
    subject: `Nuevo mensaje de contacto: ${email}`,
    html: `
      <div style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #222; margin-bottom: 20px;">Nuevo formulario de contacto recibido</h2>
          <p style="font-size: 16px; color: #555;"><strong>Nombre:</strong> ${name}</p>
          <p style="font-size: 16px; color: #555;"><strong>Email:</strong> ${email}</p>
          <p style="font-size: 16px; color: #555;"><strong>Mensaje:</strong></p>
          <blockquote style="font-style: italic; color: #444; border-left: 4px solid #FFD700; padding-left: 12px; margin-top: 10px;">
            ${message}
          </blockquote>
          <p style="font-size: 14px; color: #999; margin-top: 30px;">
            Este correo fue generado automáticamente desde el sitio web de sudo kaffee.
          </p>
        </div>
      </div>
    `,
  };
}

function buildMailToGuest({ name, email, message }) {
  return {
    from: `"sudo kaffee" <${process.env.MAIL_USERNAME}>`,
    to: email,
    subject: '¡Gracias por contactarnos!',
    html: `
      <div style="font-family: 'Arial', sans-serif; background-color: #f7f7f7; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #333;">Hola ${name} 👋</h2>
          <p style="font-size: 16px; color: #555;">
            ¡Gracias por escribirnos! Hemos recibido tu mensaje y nos pondremos en contacto contigo lo antes posible.
          </p>
          <hr style="margin: 20px 0;" />
          <p style="font-size: 14px; color: #888;">
            Este fue tu mensaje:
          </p>
          <blockquote style="font-style: italic; color: #444; border-left: 4px solid #FFD700; padding-left: 10px;">
            ${message}
          </blockquote>
          <p style="font-size: 16px; color: #555;">Atentamente,<br><strong>sudo kaffee</strong></p>
        </div>
      </div>
    `,
  };
}

export async function sendEmail({ name, email, message }) {
  try {
    const transporter = createTransporter();
    const mailToAdmin = buildMailToAdmin({ name, email, message });
    const mailToGuest = buildMailToGuest({ name, email, message });

    const infoAdmin = await transporter.sendMail(mailToAdmin);
    const infoGuest = await transporter.sendMail(mailToGuest);

    console.log(`- email sent to admin successfully: ${infoAdmin.messageId}`);
    console.log(`- email sent to guest successfully: ${infoGuest.messageId}`);
  } catch (error) {
    console.error(error);
  }
}
