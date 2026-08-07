const express= require("express");
const cors= require("cors");
const cookieParser= require("cookie-parser");
const userRouter= require("./routes/user.route.js");

const app=express();

app.use(cors({
  origin: ["https://codexradar.onrender.com","http://localhost:5173"],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/user",userRouter);

module.exports=app;
