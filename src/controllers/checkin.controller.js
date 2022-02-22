
const express = require("express");

const authenticate = require("../middlewares/authenticate");

const User=require("../models/user.models")


const router = express.Router();

router.get("",authenticate,async(req,res)=>{
    try {
        // let user=await User.find().lean().exec();
        return res.send("user");
    } catch (error) {
        console.log('error:', error)
        
    }
});

module.exports=router;