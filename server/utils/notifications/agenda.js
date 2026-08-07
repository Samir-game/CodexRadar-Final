const Agenda= require("agenda");
const {getUpcomingContests}= require("../../controllers/getUpcomingContests.js");
const {getInactiveUsers}= require("../../controllers/getInactiveUsers.js");
const sendContestReminderEmail= require("./sendContestReminderEmail.js");
const sendInactivityReminderEmail= require("./sendInactivityReminderEmail.js");
const { isEmailConfigured, verifyEmailTransport } = require("./transporter.js");
const User= require("../../models/user.model.js");
require("dotenv").config();

const agenda = new Agenda({
  db: { address: process.env.MONGO_URI || process.env.MONGODB_URI, collection: "agendaJobs" },
});


agenda.define("send inactivity reminders",async()=>{
  
  console.log("Starting inactivity reminder job");
  const inactiveUsers=await getInactiveUsers();
  for(const user of inactiveUsers){
    try {
      await sendInactivityReminderEmail(user);
    } catch (error) {
      console.log(`Failed to send inactivity email to ${user.userEmail}:`,error.message);
    }
  }
  console.log("Inactivity reminder job finished.");
});


agenda.define("send reminder for one contest",async(job)=>{
  const {contest}=job.attrs.data;

  const users=await User.find({
    codeforcesHandle: {$exists:true, $ne:""},
  }).select("userName userEmail");

  for(const user of users){
    try {
      await sendContestReminderEmail(user,contest);
    } catch (error) {
      console.error(`Failed to email ${user.userEmail}:`,error.message);
    }
  }
  console.log(`Sent reminder for contest: ${contest.name}`);
});


agenda.define("schedule contest reminder jobs",async()=>{
  console.log("Scheduling contest reminder jobs");

  const contests=await getUpcomingContests();

  for (const contest of contests) {
    const reminderAt = contest.startTimeSeconds * 1000 - 3 * 60 * 60 * 1000;
    // If the service started late, still send one useful reminder instead of dropping it.
    const reminderTime = new Date(Math.max(reminderAt, Date.now() + 5000));

    const existing=await agenda.jobs({
      name:"send reminder for one contest",
      "data.contest.id":contest.id,
    });

    if (existing.length === 0) {
      await agenda.schedule(reminderTime, "send reminder for one contest",{contest});
      console.log(`Scheduled:${contest.name} at ${reminderTime}`);
    } else {
      console.log(`Already scheduled:${contest.name}`);
    }
  }

  console.log("Finished scheduling contests.");
});


const startAgenda = async () => {
  if (!process.env.MONGO_URI && !process.env.MONGODB_URI) {
    throw new Error("MONGO_URI must be configured before notification scheduling can start.");
  }
  if (!isEmailConfigured()) {
    console.warn("Email notifications are disabled: set EMAIL_USER and EMAIL_PASS to enable them.");
    return;
  }
  await verifyEmailTransport();
  await agenda.start();
  await agenda.every("0 2 * * *", "schedule contest reminder jobs"); 
  await agenda.every("0 10 * * *", "send inactivity reminders");
  await agenda.now("schedule contest reminder jobs");
};

module.exports = startAgenda;
