import express from "express";

import cookieParser from "cookie-parser";
import ejsLayouts from "express-ejs-layouts";
import { auth } from "express-openid-connect";

const config = {
    authRequired: false,
    auth0Logout: true
  };

import { createServer } from "http";

// Create app
export const app = express();
export const server = createServer(app);

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
