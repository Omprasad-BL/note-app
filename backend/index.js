require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);
const User = require("./models/user.model");
const Note = require("./models/note.model");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticationToken } = require("./utilities");

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
    return res
      .status(404)
      .json({ error: true, message: "Fullname is required" });

  if (!email)
    return res.status(404).json({ error: true, message: "Email is required" });

  if (!password)
    return res
      .status(404)
      .json({ error: true, message: "Password is required" });

  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res
      .status(409)
      .json({ error: true, message: "Email already exists" });
  }

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });

  return res.status(200).json({
    error: false,
    user,
    accessToken,
    message: "Registration successfully",
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(404).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(404)
      .json({ error: true, message: "Password is required" });
  }

  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return res.status(401).json({ message: "User not found" });
  }

  if (userInfo.email == email && userInfo.password == password) {
    const user = {
      user: userInfo,
    };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    return res.json({
      error: false,
      message: "Login successfull",
      email,
      accessToken,
    });
  } else {
    return res.json({ error: true, message: "Invalid credentials" });
  }
});

app.post("/add-note", authenticationToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }

  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });
    await note.save();
    return res.json({ error: false, note, message: "Note added successfully" });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: true, message: "Internal server error" });
  }
});
app.get("/users", (req, res) => {
  res.json({ name: "Omprasad B L", age: 23, address: "Shivamoga  " });
});

app.get("/get-user",authenticationToken,async (req, res) => {
  const {user} = req.user;
  const isUser= await User.findOne({_id:user._id});

  if(!isUser){
    return res.sendStatus(401);
  }

  return res.json({
    fullName:isUser.fullName,
    email:isUser.email,
    "_id":isUser._id,
     message: "User fetched Successfully"});
})

app.get("/get-all-notes",authenticationToken, async(req, res) => {
  const {user} = req.user;
   
  try {
    const notes=await Note.find({userId:user._id}).sort({isPinned:-1})
    return res.json({error: false, notes, message: "All notes fetched successfully"});

  } catch (error) {
    console.log(error.message);
    
      return res.status(500).json({error:true,message: "Internal Server Error"});
  }
})

app.put('/edit-note/:noteId', authenticationToken, async (req, res) => {
  const {user} = req.user;
  const noteId = req.params.noteId;
  const {title, content, tags} = req.body;
  if(!title && !content && !tags){
    return res.status(400).json({
      error:true,
      message: "no chnages provided"
    })
  }

  try {
    const note=await Note.findOne({_id:noteId,userId:user._id})
    if(!note){
      return res.status(404).json({error:true,message:"note not found"})
    }
    if(note) note.title=title
    if(content) note.content=content
    if(tags) note.tags=tags
    // if(isPinned) note.isPinned=isPinned  
    await note.save();
    return res.json({error:false,message: "Note updated successfully",note:note})
  } catch (error) {
    return res.status(500).json({error:error,message: "Internal Server Error"})
  }
});

app.delete('/delete-note/:noteId',authenticationToken,async (req, res) => {
   const {user}=req.user;
   const noteId = req.params.noteId;
   try {
      const note=await Note.findOne({_id:noteId,userId:user._id});
      if(!note){
         return res.status(404).json({error:true,message: "Note not found"});
      }

      await note.deleteOne({_id:noteId,userId:user.id});
      return res.json({error: false, message: "Note deleted successfully"});
   } catch (error) {
      return res.status(500).json({error: true,message: "internal server "})

   }
})
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

module.exports = app;
