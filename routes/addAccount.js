import express from "express";
import { Account } from "../models/account.js";
import pkg from "express-openid-connect";
const { requiresAuth } = pkg;

export const path = "/add-account";
export const router = express.Router();

router.get("/", requiresAuth(),(req, res) => {
        res.render("addAccount");
});

router.post("/", requiresAuth(), async (req, res) =>{
    let accountName = req.body.accountName;
    console.log(req.session.userInfo);

    let accountExists = await Account.exists({userId: req.session.userInfo._id, name: accountName});

    if(accountExists){
        res.render("addAccount", {msg: "Sorry you seem to already have an account with that name"});
        return;
    }
    
    await Account.create({
        name: accountName,
        userId: req.session.userInfo._id
    });
    res.redirect("/dashboard");
});