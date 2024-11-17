import express from "express";
import { Account, Frequency } from "../models/account.js";
import { authWithSession } from "../middleware/requestHandlers.js";

export const path = "/add-account";
export const router = express.Router();

const accountTypes = {
  current: { name: "Current Account" },
  savings: {
    name: "Savings Account",
    interest: {
      apr: 1.02,
      frequency: Frequency.monthly,
    },
  },
  bonus: {
    name: "Bonus Savings Account",
    interest: {
      apr: 1.04,
      frequency: Frequency.monthly,
    },
  },
};

router.get("/", authWithSession(), (req, res) => {
  res.render("addAccount", { accountTypes });
});

router.post("/", authWithSession(), async (req, res) => {
  let accountName = req.body.accountName;
  let accountType = accountTypes[req.body.accountType];

  let accountExists = await Account.exists({
    userId: req.session.userInfo._id,
    name: accountName,
  });

  if (accountExists) {
    res.render("addAccount", {
      msg: "Sorry you already have an account with that name",
      accountTypes,
    });
    return;
  }

  await Account.create({
    name: accountName,
    userId: req.session.userInfo._id,
    interest: accountType.interest,
  });
  res.redirect("/dashboard");
});
