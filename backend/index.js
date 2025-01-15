require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);
const User=require('./models/user.model')
const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({
    data: "Hello world",
  });
});

app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;
//   return res.status(200).json("working")
  if (!fullName)
    return res.status(404).json({ error: true, message: "Fullname is required" });


if (!email)
  return res.status(404).json({ error: true, message: "Email is required" });

if (!password)
  return res.status(404).json({ error: true, message: "Password is required" });

const isUser=await User.findOne({email:email})

if(isUser){
    return res.status(409).json({ error: true, message: "Email already exists" });
}

const user = new User({
    fullName,
    email,
    password
})

await user.save();

const accessToken = jwt.sign({user},process.env.ACCESS_TOKEN_SECRET,{
    expiresIn: "1h"
})

return res.status(200).json({
    error: false,
    user,
    accessToken,
    message: "Registration successfully"
})
}
)

app.post('/login',async (req,res) => {
  const { email, password } = req.body;
  if(!email){
    return res.status(404).json({ error: true, message: "Email is required" });
  }

  if(!password){
    return res.status(404).json({ error: true, message: "Password is required" });
  }

  const userInfo=await User.findOne({ email: email})

  if(!userInfo){
    return res.status(401).json({  message: "User not found" });
  }

  if(userInfo.email == email&& userInfo.password==password){
    const user={
      user:userInfo
    }
    const accessToken=jwt.sign(user , process.env.ACCESS_TOKEN_SECRET,{
      expiresIn: "1h"
    })
    return res.json({error:false,
      message:"Login successfull",
      email,
      accessToken
    })
  }  else{
    return res.json({error:true,message:"Invalid credentials"});
  }
})
app.get("/users", (req, res) => {
  res.json({ name: "Omprasad B L", age: 23, address: "Shivamoga  " });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

module.exports = app;
