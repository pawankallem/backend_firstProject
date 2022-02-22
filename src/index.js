
const express=require("express");

const connect=require("./config/db");

const userController=require("./controllers/user.controller");

const checkingController=require("./controllers/checkin.controller")

const app=express();

app.use(express.json());

app.use("/user",userController);
app.use("/try",checkingController);

app.listen(1122,async()=>{
    try {
        await connect();
        console.log("Listening to port 1122");

    } catch (error) {
        console.log('error:', error)
        
    }
})