import dotenv from "dotenv/config.js";

import express from "express";
const app = express();

import helmet from "helmet";
app.use(helmet());

import session from "express-session";
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

app.get("/", (req, res) => {
    if(req.session){
        return res.send("welcome back")
    }
    res.send("hello");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`server is running on port: ${PORT}`));