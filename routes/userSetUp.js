import express from "express";

export const path = "/user-set-up";
export const router = express.Router();

router.get("/", (req, res) => {
    if(!req.oidc.isAuthenticated()){
        res.render("notloggedIn");
    }else{
        res.render("userSetUp", {title: "User Set Up" });
    }
});
