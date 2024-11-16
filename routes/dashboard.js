import express from "express";

export const path = "/dashboard";
export const router = express.Router();

router.get("/", (req, res) => {
    if(req.oidc.isAuthenticated()){
        res.render("dashboard", {title: "Dashboard" });
    }else{
        res.redirect("/login")
    }
});
