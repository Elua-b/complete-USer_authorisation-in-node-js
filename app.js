const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const PORT=2500;
const app=express();
const {userRoutes}=require("./routes/userRoutes")

app.use(bodyParser.json())
app.listen(PORT,()=>{
    console.log("Runining...........");
    const {userRoutes}=require("./routes/userRoutes")
})
mongoose.connect("mongodb://localhost:27017/authorisation" ).then(()=>{
    console.log("Db connected")
}).catch(()=>{
    console.log("unable to connect")
})
app.get("/",(req,res)=>{
    return res.send("welcome to my app")
})
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);
app.use("/user",userRoutes)