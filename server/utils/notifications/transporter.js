const nodemailer = require("nodemailer");
require("dotenv").config();

const emailUser = process.env.EMAIL_USER;
// EMAIL_PASS is the documented setting. PASS remains supported for existing deployments.
const emailPass = process.env.EMAIL_PASS || process.env.PASS;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

const isEmailConfigured = () => Boolean(emailUser && emailPass);

const verifyEmailTransport = async () => {
  if (!isEmailConfigured()) {
    throw new Error("EMAIL_USER and EMAIL_PASS must be configured to send notification emails.");
  }
  await transporter.verify();
};

module.exports = { transporter, isEmailConfigured, verifyEmailTransport };
