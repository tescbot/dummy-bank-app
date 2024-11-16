import express from "express";
import { User } from "../models/user.js";
import { Account } from "../models/account.js";

export const path = "/user-set-up";
export const router = express.Router();

router.get("/", (req, res) => {
    if(!req.oidc.isAuthenticated()){
        res.redirect("/login")
    }else{
        res.render("userSetUp", {title: "User Set Up" });
    }
});

router.post("/", async (req, res) => {
    if(!req.oidc.isAuthenticated()){
        res.redirect("/login")
    }
    let fullName = req.body.fullName;
    let email = req.session.userInfo.email;
    let dateOfBirth = req.body.dateOfBirth;
    let phoneNumber = req.body.phoneNumber;
    let address = {
        line1: req.body.addressLine1,
        line2: req.body.addressLine2,
        city: req.body.city,
        county: req.body.county,
        postCode: req.body.postCode,
        country: req.body.country
    }

    let newUser = await User.create({
        fullName: fullName,
        email: email,
        dateOfBirth: dateOfBirth,
        phoneNumber: phoneNumber,
        address: address
    });
    console.log(newUser);
    req.session.userInfo = newUser;

    // create account
    let newAccount = await Account.create({
        userId: req.session.userInfo._id,
        accountName: "Current"
    })
    req.session.userAccount = newAccount;
    res.redirect("/dashboard")
});

// const accountSchema = new Schema({
//     _id: { type: String, default: digits(16) },
//     sortCode: { type: String, default: digits(6) },
//     userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     money: { type: Schema.Types.Decimal128, default: 0 },
//   });