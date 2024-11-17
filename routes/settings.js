import express from "express";
import { User } from "../models/user.js";
import { authWithSession } from "../middleware/requestHandlers.js";
import { validate } from "../middleware/backupValidate.js"

export const path = "/settings";
export const router = express.Router();

router.get("/", authWithSession(), (req, res) => {
    console.log("look out below");
    console.log(req.session.userInfo);
    res.render("settings", {
        title: "Settings", userInfo: req.session.userInfo, changeDetails: false});
});

router.post("/show-details", authWithSession(), async (req, res) => {
    let errors = {};
    res.render("settings", {
        title: "Settings", userInfo: req.session.userInfo, changeDetails: true, errors: errors});
})

router.post("/change-details", authWithSession(), async (req, res) => {
    let email = req.session.userInfo.email;
    let phoneNumber = req.body.phoneNumber;
    let address = {
        line1: req.body.addressLine1,
        line2: req.body.addressLine2,
        city: req.body.city,
        county: req.body.county,
        postCode: req.body.postCode,
        country: req.body.country
    }
    //validation
    let errors = await validate({}, "phoneNumber", phoneNumber, req.session.userInfo._id);

    let oldUser = await User.findById(req.session.userInfo._id);
    oldUser.email = email;
    oldUser.phoneNumber = phoneNumber;
    oldUser.address = address;
    console.log(req.session.userInfo);
    if (Object.keys(errors).length !== 0) {
        res.render("settings", {title: "Settings", userInfo: req.session.userInfo, errors: errors, changeDetails: true});
        return;
    }

    req.session.userInfo = await oldUser.save();
    console.log(req.session.userInfo);

    res.redirect("/settings");

});