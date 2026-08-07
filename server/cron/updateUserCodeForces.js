const Codeforces= require("../models/codeforces.model.js")
const {handleRatings,handleContestHistory,handleProblemSolvingData}= require("../utils/codeforcesAPI.js");

const updateUserCodeForces= async()=>{
  
  try {

    const cfUsers=await Codeforces.find({}); 
  
    for (const cfu of cfUsers) {
      const cfHandle=cfu.codeForcesHandle;
      console.log(`updating: ${cfHandle}`)
      
      if (!cfHandle) continue;


      const {currentRating,maxRating}=await handleRatings(cfHandle);
      const problemSolved=await handleProblemSolvingData(cfHandle);
      const contestHistory=await handleContestHistory(cfHandle);

      await Codeforces.findByIdAndUpdate(cfu._id,{
        currentRating,
        maxRating,
        problemSolved,
        contestHistory,
        lastSyncedAt: new Date(),
      },{new:true});

      console.log(`updated: ${cfHandle}`)

    }

  } catch (error) {
    console.log("Error in updateUserCodeForces:", error.message);
  }
};

module.exports = {
  updateUserCodeForces
};
