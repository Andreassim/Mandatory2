import dotenv from "dotenv/config.js";

import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

import session from "express-session";
app.use(session({
    name: "howdyID",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

import cors from "cors";
app.use(cors({
    credentials: true,
    origin: true
}));

import helmet from "helmet";
app.use(helmet());

import authRouter from "./routers/authRouter.js";
app.use(authRouter);

import usersRouter from "./routers/usersRouter.js";
app.use(usersRouter);

import messagesRouter from "./routers/messagesRouter.js";
app.use(messagesRouter);

app.get("/", (req, res) => {
    console.log(req.session);
    if(req.session.user){
        return res.send({user: req.session.user});
    }
    res.send({message: "hello"});
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`server is running on port: ${PORT}`));