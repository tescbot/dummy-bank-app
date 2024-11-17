import express from "express";
import { User } from "../models/user.js";
import { Transaction } from "../models/transaction.js";
import { Account } from "../models/account.js";
import { getPayedBefore } from "../middleware/helper.js";
import { authWithSession } from "../middleware/requestHandlers.js";

export const path = "/transaction";
export const router = express.Router();

router.get("/:sortCode/:accountNumber", authWithSession(), async (req, res) => {
  let destSortCode = "";
  let destAccountNumber = "";
  let name = "";

  if(req.query){
    destSortCode = req.query.destSortCode;
    destAccountNumber = req.query.destAccountNumber;
    name = req.query.recipientName;
  }

  let payedBefore = await getPayedBefore(await User.findById(req.session.userInfo._id));

  res.render("transactionForm", {sourceSortCode: req.params.sortCode,
     sourceAccountNumber: req.params.accountNumber,
     recipientSortCode: destSortCode,
     recipientAccountNumber: destAccountNumber,
     recipientName: name,
     payedBefore: payedBefore,
     title: "Move money"});
});

router.post("/", async (req, res) => {
  let name = req.body.fullName;
  let recipientAccountNumber = req.body.accountNumber;
  let recipientSortCode = req.body.sortCode;
  let amount = new Number(req.body.amount);
  let ref = req.body.reference;

  let currUserSortCode = req.body.sourceSortCode;
  let currUserAccountNumber = req.body.sourceAccountNumber;

  console.log(currUserAccountNumber);
  console.log(currUserSortCode);

  let currUserAccount = await Account.findOne({sortCode: currUserSortCode,
    _id: currUserAccountNumber})
  let recipientAccount = await Account.findOne({sortCode: recipientSortCode,
    _id: recipientAccountNumber});

  console.log(currUserAccount);
  console.log(recipientAccount);

  currUserAccount.money -= amount;
  recipientAccount.money += amount;

  console.log(recipientAccount);

  if(!ref){
    ref = "";
  }

  await Transaction.create({
    senderAccountId: currUserAccount._id,
    recipientAccountId: recipientAccount._id,
    reference: ref,
    amountSent: amount
  });

  console.log(recipientAccount);

  await currUserAccount.save();
  await recipientAccount.save();

  res.render("confirmation", {
    recipient: name,
    accNumber: recipientAccountNumber,
    sortCode: recipientSortCode,
    amountSent: amount,
    reference: ref,
  });
});
