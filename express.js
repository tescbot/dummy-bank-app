import express from "express";

import cookieParser from "cookie-parser";
import ejsLayouts from "express-ejs-layouts";
import { auth } from "express-openid-connect";
import Session from "express-session";
import * as crypto from "crypto";

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL:
    process.env.ENVIRONMENT === "production"
      ? "https://dummy-bank-app.fly.dev"
      : "http://localhost:8080/",
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER,
};

import { createServer } from "http";

// Create app
export const app = express();
export const server = createServer(app);

// For Sessions
const secret = crypto.randomBytes(64).toString("hex");
app.use(
  Session({
    secret: secret,
    resave: true,
    saveUninitialized: true,
  })
);

// Setup view engine
app.use(ejsLayouts);
app.set("layout", "layouts/base");
app.set("view engine", "ejs");

// Setup request middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// Setup static routes
app.use(express.static("./public"));
