import express from "express";
import { User } from "../models/user.js"

export const path = "/";
export const router = express.Router();

router.get("/", (req, res) => {
  if(req.oidc.isAuthenticated()){
    res.redirect("/loggedIn");
  }else{
    res.render("notLoggedIn");
  }
});

router.get("/loggedIn", async (req, res) => {
  if(req.oidc.isAuthenticated()){
    let details = req.oidc.user;
    console.log(details.email);
    req.session.userInfo = req.oidc.user
    if (await User.exists({email: details.email})) {
      res.redirect("/dashboard");
    } else {
      res.redirect("/user-set-up")
    }
    // res.render("loggedIn", {info: req.oidc.user});
  }else{
    res.redirect("/");
  }
});
