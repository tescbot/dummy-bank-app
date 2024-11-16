import express from "express";

import { authWithSession } from "../middleware/requestHandlers.js";
import { Account } from "../models/account.js";
import { Transaction } from "../models/transaction.js";

export const path = "/dashboard";
export const router = express.Router();

router.get("/", authWithSession(), async (req, res) => {
  const user = req.session.userInfo;
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
        amountSent: t.amountSent,
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
