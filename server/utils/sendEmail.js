import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `Antigravity <${process.env.SMTP_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    console.log("[EMAIL] Sending email to:", options.email);

    await transporter.sendMail(mailOptions);

    console.log("[EMAIL] Email sent successfully ✅");
  } catch (error) {
    console.error("[EMAIL ERROR]", error);
    throw new Error("Email could not be sent");
  }
};

export default sendEmail;