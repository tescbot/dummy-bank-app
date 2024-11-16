import express from "express";
import auth0 from "express-openid-connect";

import { Account } from "../models/account.js";
import { User } from "../models/user.js";
import { Transaction } from "../models/transaction.js";

export const path = "/dashboard";
export const router = express.Router();

router.get("/", auth0.requiresAuth(), async (req, res) => {
  const user = await User.findOne({ email: req.oidc.user.email });
  const accounts = await Account.find({ userId: user._id });

  let transactions = {};
  for (const acc of accounts) {
    const ts = await Transaction.find({
      $or: [{ senderAccountId: acc._id }, { recipientAccountId: acc._id }],
    });

    transactions[acc._id] = [];
    for (const t of ts) {
      transactions[acc._id].push({
        sender: await Account.findById(t.senderAccountId),
        recipient: await Account.findById(t.recipientAccountId),
        amountSent: 400,
        reference: t.reference,
      });
    }
  }

  res.render("dashboard", {
    title: "Dashboard",
    user,
    accounts,
    transactions,
  });
});
