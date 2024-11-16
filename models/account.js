import { model, Schema } from "mongoose";
import { User } from "./user.js";

const accountSchema = new Schema({
  _id: { type: String, required: true },
  sortCode: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

accountSchema.methods.getUser = function () {
  return User.findById(this.userId);
};

export const Account = model("Account", accountSchema);
