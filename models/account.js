import { model, Schema } from "mongoose";
import { digits } from "../middleware/generators.js";

import { Transaction } from "./transaction.js";
import { User } from "./user.js";

export const Frequency = {
  secondly: "secondly",
  minutely: "minutely",
  hourly: "hourly",
  daily: "daily",
  weekly: "weekly",
  monthly: "monthly",
};

const accountSchema = new Schema({
  _id: { type: String, default: digits(16) },
  name: { type: String, required: true, unique: true },
  sortCode: { type: String, default: "999999" },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  money: { type: Number, default: 0 },
  interest: {
    type: {
      _id: false,
      apr: { type: Number, required: true },
      frequency: { type: Object.values(Frequency), required: true },
      lastTick: { type: Date, default: Date.now },
    },
    default: undefined,
  },
});

accountSchema.methods.getUser = function () {
  return User.findById(this.userId);
};

accountSchema.methods.getSentTransactions = function () {
  return Transaction.find({ senderAccountId: this._id });
};

accountSchema.methods.getRecievedTransactions = function () {
  return Transaction.find({ senderAccountId: this._id });
};

accountSchema.methods.getTransactions = function () {
  return Transaction.find({
    $or: [{ senderAccountId: this._id }, { recipientAccountId: this._id }],
  });
};

export const Account = model("Account", accountSchema);
