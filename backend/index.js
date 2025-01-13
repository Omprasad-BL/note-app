const express= require('express')
const cors= require('cors')
const app= express()
app.use(express.json())
app.use(cors({
    origin:"*",

}))

app.get("/",(req,res)=>{
    res.json({
        data:"Hello world"
    })
})

app.get("/users",(req,res)=>{
    res.json({"name":"Omprasad B L","age":23,"address":"Shivamoga  "})
})

app.listen(8000,()=>{
    console.log("Server is running on port 8000")
})

module.exports=app;

