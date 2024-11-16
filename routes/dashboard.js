import express from "express";

export const path = "/dashboard";
export const router = express.Router();

router.get("/", (req, res) => {
    if(req.oidc.isAuthenticated()){
        res.redirect("/loggedIn");
    }else{
        res.render("dashboard", {title: "Dashboard" });
    }
});
