const axios = require("axios");
const User = require("../models/user.model.js");

const getInactiveUsers = async () => {
  const period=Date.now() - 2*24*60*60*1000;

  const inactiveUsers = [];

  const users = await User.find({
    codeforcesHandle: { $exists: true, $ne: "" },
  }).select("userName userEmail codeforcesHandle");

  for (const user of users) {
    try {
      const response = await axios.get(
        `${process.env.CODEFORCES_STATUS_API}?handle=${user.codeforcesHandle}&count=1`
      );

      const submissions=response?.data?.result || [];

      if(submissions.length===0){
        inactiveUsers.push({
          ...user.toObject(),
          daysInactive: "Never submitted",
        });

      } else{
        const lastSubmissionTime=submissions[0].creationTimeSeconds*1000;

        if(lastSubmissionTime<period){
          const daysInactive=Math.floor(
            (Date.now()-lastSubmissionTime)/(24*60*60*1000)
          );
          inactiveUsers.push({
            ...user.toObject(),
            daysInactive,
          });
        }
      }
    } catch (error) {
      console.error(`Error fetching activity for ${user.codeforcesHandle}:`,error.message);
    }
  }

  return inactiveUsers;
};

module.exports = {
  getInactiveUsers,
};
