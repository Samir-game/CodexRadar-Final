const Codeforces= require("../models/codeforces.model.js");

const getUserInfo=async(req,res)=>{

  try {
    const {_id,userName,userEmail}=req.user;

    if(!_id || !userName || !userEmail){
      return res.status(400).json({
        message: "Please login first.",
      });
    }

    const userCFInfo=await Codeforces.findOne({user:_id});

    if(!userCFInfo){
      return res.status(404).json({
        message: "Codeforces data not found for this user.",
      });
    }

    return res.status(200).json({
      userName,
      userEmail,
      userCFInfo,
    });

  } catch (error) {
    console.log("Error getting user information:", error.message);
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

module.exports={
  getUserInfo
};