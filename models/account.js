import { model, Schema } from "mongoose";

const accountSchema = new Schema({
  _id: { type: String, required: true },
  sortCode: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

export const Account = model("Account", accountSchema);
