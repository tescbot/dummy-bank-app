import { model, Schema } from "mongoose";

const accountSchema = new Schema({
  _id: { type: String, required: true },
  sortCode: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  phoneNumber: { type: String, required: true },
  address: {
    line1: { type: String, required: true },
    line2: String,
    county: String,
    postCode: { type: String, required: true },
    country: { type: String, required: true },
  },
});

export const Account = model("Account", accountSchema);
