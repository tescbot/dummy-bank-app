import { model, Schema } from "mongoose";

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

export const User = model("User", userSchema);
