
const express = require("express");

const { body, validationResult } = require('express-validator');

require("dotenv").config();

const jwt = require("jsonwebtoken");


const User = require("../models/user.models");

const newToken = (user) => {

    // console.log(user)
    return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

const router = express.Router();

router.post("/register",
    body("first_Name").notEmpty().withMessage("First Name required"),
    body("last_Name").notEmpty().withMessage("Last Name required"),
    body("email_Id").isEmail().custom(async (value) => {

        let user = await User.findOne({ email_Id: value });
        if (user) {
            throw new Error('Email alredy exists');
        }
        return true;
    }),
    body("mobile_Number").notEmpty().isNumeric().isLength({ min: 10, max: 10 }).withMessage("Mobile Number must be 10 numbers"),
    body("password").notEmpty().withMessage("This field is required"),
    body("confirm_password").notEmpty().withMessage("This field is required"),
    async (req, res) => {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                let newErrors;
                newErrors = errors.array().map((err) => {
                    return { message: err.msg };
                });
                return res.status(400).send({ errors: newErrors });
            }


            let user = await User.findOne({ email_Id: req.body.email_Id }).lean().exec();

            // console.log(user);
            if (user) {
                return res.status(400).send({ message: "Email already taken" });
            }

            if (req.body.password != req.body.confirm_password) {
                return res.status(400).send({ message: "Password not matched" });
            }

            user = await User.create(req.body);

            const token = newToken(user);

            console.log(user);

            return res.status(201).send({ token });

        } catch (error) {
            return res.status(400).send({ message: error.message });
        }
    })

router.post("/login",
    body("email_Id").isEmail().custom(async (value) => {

        let user = await User.findOne({ email_Id: value });
        if (!user) {
            throw new Error('Email not found');
        }
        return true;
    }),
    body("password").notEmpty().withMessage("Enter password"),
    async (req, res) => {
        try {
            const user = await User.findOne({ email_Id: req.body.email_Id });

            if (!user)
                return res
                    .status(400)
                    .send({ message: "Please try another email or password" });

            const match = user.checkPassword(req.body.password);

            if (!match)
                return res
                    .status(400)
                    .send({ message: "Please try another email or password" });

            const token = newToken(user);

            console.log(user)

            res.send({token });
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

module.exports = router;