import { Router } from "express";
import bcrypt from "bcrypt";
const router = Router();

import db from "../database/connection.js";

router.post("/users", async (req, res) => {
    // validation
    if(!req.body.email || !req.body.password){
        return res.send(400).send({message: "missing email or password"})
    }
    const password = await bcrypt.hash(req.body.password, 12);
    // query
    try{
        await db.run("INSERT INTO users (email, password) VALUES (?, ?)", [req.body.email, password]);

        return res.status(200).send({message: "user created"});
        
    } catch (err){
        return res.status(400).send({message: "users already exists"});
    }
})

export default router;
