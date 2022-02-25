
const express = require("express");

// app.use(express.static("public"));

const { body, validationResult } = require('express-validator');

require("dotenv").config();

const jwt = require("jsonwebtoken");


const User = require("../models/user.models");

const newToken = (user) => {

    // console.log(user)
    return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

const router = express.Router();



router.get("", async (req, res) => {
    try {
   
             // let user = await User.find().lean().exec();

        //    import navbar from "/Users/Pavan Kallem/Desktop/backend project/public/js/testnav.js";

        // res.render("users/login_and_singup.ejs");

        // const {navbar}=require("/Users/Pavan Kallem/Desktop/backend project/public/js/testnav.js");
        // console.log(navbar())

    //   let container=document.getElementById("container");

    //   container.innerEjs=navbar();


        // console.log('coming in this page only');
        return res.render("users/login_and_singup.ejs",);


    } catch (error) {
        console.log('error:', error)

    }
});

router.post("/register",
    body("first_Name").notEmpty().withMessage("First Name is required"),
    body("last_Name").notEmpty().withMessage("Last Name is required"),
    body("email_Id").isEmail().withMessage("Email is required "),
    body("mobile_Number").notEmpty().isNumeric().isLength({ min: 10, max: 10 }).withMessage("Mobile Number must be 10 numbers"),
    body("password").notEmpty().withMessage("This field is required"),
    body("confirm_password").notEmpty().withMessage("This field is required"),
    async (req, res,next) => {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                // let newErrors;
                // newErrors = errors.array().map((err) => {
                //     return { message: err.msg };
                // });
                // return res.status(400).send({ errors: newErrors });

                const alert=errors.array();

                // console.log(alert);
                // console.log(alert[0].msg);

                // <% if(typeof alert != "undefined") { %>

                //     <% alert.forEach(function (err) { %>

                //       <% if( err.param == 'first_Name') { %>
                    
                //         <p id="first_name_alert" class="hide_alert">
                //         <%= err.msg %>
                //         </p>

                //         <% } %>
                //     <% }) %>

                //     <% } %>

                // console.log("hi" , alert);

                // console.log(alert);
                return res.render("users/login_and_singup.ejs",{alert})
            }


            let user = await User.findOne({ email_Id: req.body.email_Id }).lean().exec();

            if (user) {
                return res.status(400).render("users/login_and_singup.ejs",{email_message:"Email already taken"});
            }

            if (req.body.password != req.body.confirm_password) {
                return res.status(400).render("users/login_and_singup.ejs",{message:"Password not matched"});
            }

            user = await User.create(req.body);

            const token = newToken(user);

            // console.log(user);

            // console.log({user,token})
            // return res.render("users/index.ejs",{user,token});


            console.log('coming in register')
             res.render("users/login_and_singup.ejs");

             next();

            // return res.status(201).send({ token });

        } catch (error) {
            // console.log(error.message);
            return res.status(400);
        }
    })

router.post("",
    body("email_Id").isEmail().withMessage("Enter Your mail id"),
    body("password").notEmpty().withMessage("Enter password"),
    async (req, res) => {
        try {

            const login_errors = validationResult(req);

            if (!login_errors.isEmpty()) {
               
                const login_alert=login_errors.array();

            
                return res.render("users/login_and_singup.ejs",{
                    login_alert
                })
            }


            const user = await User.findOne({ email_Id: req.body.email_Id });

            if (!user)
            return res.status(400).render("users/login_and_singup.ejs",{user_email_message:"Check the email or password"});

            const match = user.checkPassword(req.body.password);

            if (!match)
            return res.status(400).render("users/login_and_singup.ejs",{user_email_message:"Check the email or password"});;

            const token = newToken(user);

            res.cookie("jwt", token);
            // console.log(cookie);

            // return res.render("users/login_and_singup",{user});

            // console.log(res.cookie);

            //  user = await User.find().lean().exec();
                return res.render("users/login_and_singup.ejs");

            // res.send({token });
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

module.exports = router;