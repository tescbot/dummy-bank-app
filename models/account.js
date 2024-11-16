import { model, Schema } from "mongoose";
import { digits } from "../middleware/generators.js";

import { Transaction } from "./transaction.js";
import { User } from "./user.js";

const accountSchema = new Schema({
  _id: { type: String, default: digits(16) },
  name: {type: String, required: true, unique: true},
  sortCode: { type: String, default: digits(6) },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  money: { type: Schema.Types.Decimal128, default: 0 }
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
