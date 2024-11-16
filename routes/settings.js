import express from "express";
import { User } from "../models/user.js";

export const path = "/settings";
export const router = express.Router();

router.get("/", (req, res) => {
    if(!req.oidc.isAuthenticated()){
        res.redirect("/login");
    }else{
        console.log(req.session.userInfo);
        res.render("settings", {
            title: "Settings", userInfo: req.session.userInfo});
    }
});

router.post("/", async (req, res) => {
    console.log("heyyyyyyyy");
    if(!req.oidc.isAuthenticated()){
        res.redirect("/login");
    }else{
        let email = req.body.email;
        console.log("EMAILLLLL");
        console.log(email);
        let phoneNumber = req.body.phoneNumber;
        let address = {
            line1: req.body.addressLine1,
            line2: req.body.addressLine2,
            city: req.body.city,
            county: req.body.county,
            postCode: req.body.postCode,
            country: req.body.country
        }
        console.log("heyyyyyyyy");
        console.log(req.body);
        let oldUser = await User.findById(req.session.userInfo._id);
        oldUser.email = email;
        oldUser.phoneNumber = phoneNumber;
        oldUser.address = address;
        req.session.userInfo = await oldUser.save();

        res.render("settings", {title: "Settings", userInfo: req.session.userInfo});
    }
});