import express from "express";
import auth0 from "express-openid-connect";

import { Account } from "../models/account.js";
import { User } from "../models/user.js";

export const path = "/dashboard";
export const router = express.Router();

router.get("/", auth0.requiresAuth(), async (req, res) => {
  const user = await User.findOne({ email: req.oidc.user.email });
  const accounts = await Account.find(); //{ userId: user._id });

  res.render("dashboard", {
    title: "Dashboard",
    user,
    accounts,
  });
});
