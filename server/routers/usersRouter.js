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
        const user = await db.run("INSERT INTO users (email, password) VALUES (?, ?)", [req.body.email, password])
        delete user['password']
        return res.status(200).send({message: "user created", user: user});
    }
    catch (errors){
        return res.sendStatus(400);
    }
})

export default router;