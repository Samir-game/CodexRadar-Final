const { transporter } = require("./transporter.js");

const sendInactivityReminderEmail = async (user) => {
  const { userName, userEmail, daysInactive } = user;

  const mailOptions = {
    from: `"CodexRadar" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: `We miss you on Codeforces!`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Hi ${userName},</h2>
        <p>It's been <strong>${daysInactive} days</strong> since your last submission on Codeforces. 😴</p>
        <p>Why not shake off the rust and solve a problem today? Keep that streak alive! 🚀</p>
        <a href="https://codeforces.com/problemset" target="_blank" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Start Solving</a>
        <p style="margin-top: 30px; font-size: 14px; color: #888;">— Team CodexRadar 💻</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Sent inactivity reminder to ${userEmail}`);
};

module.exports = sendInactivityReminderEmail;
