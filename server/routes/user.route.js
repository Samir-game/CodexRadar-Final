const {handleLogin,handleSignUp,handleDeleteUser,handleLogout}= require("../controllers/user.controller.js")
const {auth}= require("../middlewares/auth.middleware.js")
const {getUserInfo}= require("../controllers/getUserInfo.js")
const {getCoachInsights}= require("../controllers/aiCoach.controller.js")
const express= require("express")
const router= express.Router();

router
.route("/signup")
.post(handleSignUp)

router
.route("/login")
.post(handleLogin)

router
.route("/home")
.get(auth,getUserInfo)

router
.route("/ai-coach")
.get(auth,getCoachInsights)

router
.route("/delete")
.delete(auth,handleDeleteUser)

router
.route("/logout")
.post(auth,handleLogout);


module.exports= router;

