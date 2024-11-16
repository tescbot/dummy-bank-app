import { model, Schema } from "mongoose";
import { User } from "./user.js";
import { Account } from "./account.js";

const transactionSchema = new Schema(
  {
    senderAccountId: {
      type: String,
      ref: "Account",
      required: true,
    },
    recipientAccountId: {
      type: String,
      ref: "Account",
      required: true,
    },
    amountSent: { type: Number, required: true },
    reference: String,
  },
  { timestamps: true }
);

transactionSchema.methods.getSenderAccount = function () {
  return Account.findById(this.senderAccountId);
};

transactionSchema.methods.getRecipientAccount = function () {
  return Account.findById(this.recipientAccountId);
};

export const Transaction = model("Transcation", transactionSchema);
