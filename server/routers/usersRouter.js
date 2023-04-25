import { Router } from "express";
import bcrypt from "bcrypt";
import { sendWelcomeMail } from "../util/emailGenerator.js";

const router = Router();

import db from "../database/connection.js";

router.post("/users", async (req, res) => {
    // validation
    if(!req.body.email || !req.body.password){
        return res.status(400).send({message: "missing email or password"})
    }
    const password = await bcrypt.hash(req.body.password, 12);
    // query
    try{
        await db.run("INSERT INTO users (email, password) VALUES (?, ?)", [req.body.email, password]);
        
    } catch (err){
        return res.status(400).send({message: "users already exists"});
    }
    try {
        await sendWelcomeMail(req.body);
    }catch (err){
        console.log(err); // Add error handling..
    }
    return res.status(200).send({message: "user created"});
})

export default router;
