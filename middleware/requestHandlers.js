import auth0 from "express-openid-connect";
import { User } from "../models/user.js";

export function authWithSession(requiresLoginCheck) {
  return (req, res, next) => {
    auth0.requiresAuth(requiresLoginCheck)(req, res, async () => {
      const user = await User.findOne({ email: req.oidc.user.email });
      if (user) {
        req.session.userInfo = user;
        next();
      } else {
        res.redirect("/user-set-up");
      }
    });
  };
}
