const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/send', async (req, res) => {
  const { name, lastName, email, phone, company, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'khanbasha7777777@gmail.com',
      pass: 'hpdi qrqk plrn blzz',
    },
  });

  const mailOptions = {
    from: 'Projexino Contact <khanbasha7777777@gmail.com>',
    to: 'msadiqbasha777@gmail.com, khanbasha7777777@gmail.com',
    subject: 'New Contact Form Submission from Projexino',
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; background: #f8fafc;">
        <h2 style="color: #1B3C73;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="font-weight: bold; padding: 8px;">First Name:</td><td style="padding: 8px;">${name}</td></tr>
          <tr><td style="font-weight: bold; padding: 8px;">Last Name:</td><td style="padding: 8px;">${lastName}</td></tr>
          <tr><td style="font-weight: bold; padding: 8px;">Email:</td><td style="padding: 8px;">${email}</td></tr>
          <tr><td style="font-weight: bold; padding: 8px;">Phone:</td><td style="padding: 8px;">${phone}</td></tr>
          <tr><td style="font-weight: bold; padding: 8px;">Company:</td><td style="padding: 8px;">${company}</td></tr>
          <tr><td style="font-weight: bold; padding: 8px;">Message:</td><td style="padding: 8px;">${message}</td></tr>
        </table>
        <p style="margin-top: 24px; color: #64748b; font-size: 0.95rem;">This message was sent from the Projexino contact form.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 