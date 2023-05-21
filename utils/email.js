const nodemailer = require('nodemailer');

const nodemailerConfig = {
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'mikel.bauch11@ethereal.email',
    pass: 'SkS3UZ9gbAMUxyB1ur',
  },
};

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: '"JobTrackerPro" <jobtrackerpro@gmail.com>',
    to,
    subject,
    html,
  });
};

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const subject = 'Verify your email';

  const verificationUrl = `${origin}/api/v1/auth/verifyEmail?token=${verificationToken}&email=${email}`;

  const html = `
    <h1>Verify your email</h1>
    <p>Hi ${name},</p>
    <p>Thanks for registering!</p>
    <p>Please click the link below to verify your email address:</p>
    <a href="${verificationUrl}">${verificationUrl}</a>
  `;

  return sendEmail({ to: email, subject, html });
};

module.exports = sendVerificationEmail;
