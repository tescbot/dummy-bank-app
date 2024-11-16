import { model, Schema } from "mongoose";
import { Account } from "./account.js";

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  phoneNumber: { type: String, required: true },
  address: {
    _id: false,
    line1: { type: String, required: true },
    line2: String,
    city: String,
    county: String,
    postCode: { type: String, required: true },
    country: { type: String, required: true },
  },
});

userSchema.methods.getAccounts = function () {
  return Account.find({ user: this._id });
};

export const User = model("User", userSchema);
