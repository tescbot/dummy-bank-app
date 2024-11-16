import express from "express";
import { User } from "../models/user.js"

export const path = "/";
export const router = express.Router();

router.get("/", (req, res) => {
  if(req.oidc.isAuthenticated()){
    res.redirect("/loggedIn");
  }else{
    res.redirect("/login")
  }
});

router.get("/loggedIn", async (req, res) => {
  if(req.oidc.isAuthenticated()){
    let details = req.oidc.user;
    req.session.userInfo = req.oidc.user
    if (await User.exists({email: details.email})) {
      req.session.userInfo = await User.findOne({email: details.email});
      res.redirect("/dashboard");
    } else {
      res.redirect("/user-set-up")
    }
  }else{
    res.redirect("/");
  }
});
