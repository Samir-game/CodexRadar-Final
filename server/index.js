const dotenv= require("dotenv")
const {connectionDB}= require("./database/db.js");
const app= require("./app.js");
const {updateUserCodeForces}= require("./cron/updateUserCodeForces.js")
const cron= require('node-cron')
const startAgenda = require("./utils/notifications/agenda.js");



dotenv.config({
    path:"./.env"
})

const PORT= process.env.PORT || 3001;

const updationTask= async ()=>{
    try {
        console.log("Updating the Users codeforces data")
        await updateUserCodeForces()
    } catch (error) {
        console.log("error updating codeforces",error)
    }
}

connectionDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log("SERVER started at PORT: ",PORT)
    })

    cron.schedule("0 2 * * *", updationTask);
    console.log("Cron job scheduled: Codeforces data will be updated every day at 2 AM.");

    startAgenda() 
    .then(() => 
        console.log("Agenda started: Contest reminders,inactivity reminders."))
    .catch((error) => console.error("Agenda start failed:", error.message));

})
.catch((error)=>{
    console.log("CONNECTION FAILED",error.message)
})