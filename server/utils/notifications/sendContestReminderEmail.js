const { transporter } = require("./transporter.js");

const sendContestReminderEmail = async (user, contest) => {
  const start = new Date(contest.startTimeSeconds * 1000).toLocaleString("en-IN");

  const mailOptions = {
    from: `"CodexRadar" <${process.env.EMAIL_USER}>`,
    to: user.userEmail,
    subject: `Codeforces Contest Reminder: ${contest.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #2c3e50;">👋 Hey ${user.userName},</h2>
        <p style="font-size: 16px;">
          It's almost time to put your problem-solving skills to the test! 🚀  
          A new <strong>Codeforces contest</strong> is just around the corner.
        </p>

        <div style="background-color: #f0f4ff; padding: 15px; border-left: 5px solid #007bff; margin: 20px 0;">
          <p><strong>📛 Contest:</strong> ${contest.name}</p>
          <p><strong>🕒 Starts at:</strong> ${start}</p>
          <p><strong>⏳ Duration:</strong> ${(contest.durationSeconds / 3600).toFixed(1)} hours</p>
        </div>

        <p style="font-size: 16px;">Aim high, stay calm, and code smart. 💡</p>
        <p style="font-size: 16px;">Good luck, and may the ratings be ever in your favor! 🍀</p>

        <p style="margin-top: 30px; font-size: 14px; color: #888;">— Team CodexRadar 💻</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Sent contest reminder to ${user.userEmail}`);
};

module.exports = sendContestReminderEmail;
