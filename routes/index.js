import express from "express";

export const path = "/";
export const router = express.Router();

router.get("/", (req, res) => {
  if(req.oidc.isAuthenticated()){
    res.redirect("/loggedIn");
  }else{
    res.render("notLoggedIn");
  }
});

router.get("/loggedIn", (req, res) => {
  if(req.oidc.isAuthenticated()){
    res.render("loggedIn", {info: req.oidc.user});
  }else{
    res.redirect("/");
  }
});
