import dotenv from "dotenv/config.js";

import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

import cors from "cors";
app.use(cors({
    credentials: true,
    origin: true
}));

import helmet from "helmet";
app.use(helmet());

import session from "express-session";
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

import authRouter from "./routers/authRouter.js";
app.use(authRouter);

app.get("/", (req, res) => {
    if(req.session.user){
        return res.send({user: req.session.user});
    }
    res.send({message: "hello"})
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`server is running on port: ${PORT}`));