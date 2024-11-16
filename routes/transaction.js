import express from "express";
import { User } from "../models/user.js";
import { Account } from "../models/account.js";
import { Transaction } from "../models/transaction.js";

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

    let currUser = await User.findOne({email: req.session.userInfo.email});
    let currUserAccount = await currUser.getAccounts()[0];
    let recipientAccount = await Account.findById(accountNumber);

    currUserAccount.money -= amount;
    recipientAccount.money += amount;

    
    let newTransaction = new Transaction(currUserAccount._id, recipientAccount._id, amount, ref);
    
    currUserAccount.save();
    recipientAccount.save();
    newTransaction.save();

    res.render("confirmation", {recipient: name, accNumber: accountNumber,
       sortCode: sortCode, amountSent: amount, reference: ref});
})

