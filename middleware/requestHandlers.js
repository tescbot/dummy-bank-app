import auth0 from "express-openid-connect";
import { User } from "../models/user.js";

export function authWithSession(requiresLoginCheck) {
  return (req, res, next) => {
    auth0.requiresAuth(requiresLoginCheck)(req, res, async () => {
      req.session.userInfo = await User.findOne({ email: req.oidc.user.email });
      next();
    });
  };
}
