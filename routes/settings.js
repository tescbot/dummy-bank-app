import express from "express";

export const path = "/settings";
export const router = express.Router();

router.get("/", (req, res) => {
    if(!req.oidc.isAuthenticated()){
        res.redirect("/login");
    }else{
        res.render("settings", {title: "Settings" });
    }
});
