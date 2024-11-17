import express from "express";
import { User } from "../models/user.js";
import { Account } from "../models/account.js";
import { validate } from "../middleware/backupValidate.js";
import auth0 from "express-openid-connect";

export const path = "/user-set-up";
export const router = express.Router();

router.get("/", auth0.requiresAuth(), (req, res) => {
  res.render("userSetUp", { title: "User Set Up", errors: {} });
});

router.post("/", auth0.requiresAuth(), async (req, res) => {
  let fullName = req.body.fullName;
  let email = req.oidc.user.email;
  let dateOfBirth = req.body.dateOfBirth;
  let phoneNumber = req.body.phoneNumber;
  let address = {
    line1: req.body.addressLine1,
    line2: req.body.addressLine2,
    city: req.body.city,
    county: req.body.county,
    postCode: req.body.postCode,
    country: req.body.country,
  };
  let errors = await validate({}, "phoneNumber", phoneNumber, -1);
  if (Object.keys(errors).length !== 0) {
    res.render("userSetUp", {
      title: "User Set Up",
      errors: errors,
      bd: req.body,
    });
    return;
  }

  let newUser = await User.create({
    fullName: fullName,
    email: email,
    dateOfBirth: dateOfBirth,
    phoneNumber: phoneNumber,
    address: address,
  });
  console.log(newUser);
  req.session.userInfo = newUser;

  // create account
  let newAccount = await Account.create({
    userId: req.session.userInfo._id,
    name: "Current",
  });
  req.session.userAccount = newAccount;
  res.redirect("/dashboard");
});
