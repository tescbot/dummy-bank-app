import express from "express";
import { User } from "../models/user.js"
import pkg from "express-openid-connect";
const { requiresAuth } = pkg;

export const path = "/";
export const router = express.Router();

router.get("/", requiresAuth(), async (req, res) => {
  let details = req.oidc.user;
  req.session.userInfo = req.oidc.user
  if (await User.exists({email: details.email})) {
    req.session.userInfo = await User.findOne({email: details.email});
    res.redirect("/dashboard");
  } else {
    res.redirect("/user-set-up")
  }
});
