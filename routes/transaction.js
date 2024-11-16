import express from "express";
import { User } from "../models/user.js";

export const path = "/transaction";
export const router = express.Router();

router.get("/", (req, res) => {
  res.render("transactionForm");
});

router.post("/", async (req, res) => {
    let name = req.body.fullName;
    let accountNumber = req.body.accountNumber;
    let sortCode = req.body.sortCode;
    let amount = req.body.amount;
    let ref = req.body.amount;

    // let currUser = await User.findOne({email: req.session.userInfo.email});
    // let currUserAccount = await 
    // let recipient = await User.findOne({email: })
})

