
const express = require("express");

const authenticate = require("../middlewares/authenticate");

const User=require("../models/user.models")


const router = express.Router();

router.get("",async(req,res)=>{
    try {
        let user=await User.find().lean().exec();
        return res.render("users/index.ejs",{user});
    } catch (error) {
        console.log('error:', error)
        
    }
});

router.post("",async(req,res)=>{
    try {
        await User.create(req.body);

        let user=await User.find().lean().exec();

        return res.render("users/index.ejs",{user});
    } catch (error) {
        console.log('error:', error)
        
    }
});

// router.post("",async(req,res)=>{
//     try {
//         await User.create(req.body);

//         let user=await User.find().lean().exec();
//         let message="registration succsessful";

//         return res.render("users/index.ejs",{user});
//     } catch (error) {
//         console.log('error:', error)
        
//     }
// });

module.exports=router;