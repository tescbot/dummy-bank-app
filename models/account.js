import { digits } from "../middleware/generators.js";
import { model, Schema } from "mongoose";
import { User } from "./user.js";

const accountSchema = new Schema({
  _id: { type: String, default: digits(16) },
  sortCode: { type: String, default: digits(6) },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

accountSchema.methods.getUser = function () {
  return User.findById(this.userId);
};

export const Account = model("Account", accountSchema);
