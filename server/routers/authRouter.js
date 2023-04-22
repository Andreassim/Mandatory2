import { Router } from "express";
import bcrypt from "bcrypt";
const router = Router();

import db from "../database/connection.js";


router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.status(200).send({message: "logged out"});
    });
});

router.post("/login", async (req, res) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).send({message: "missing email or password"});
    }
    const tempUser = await db.get("SELECT users.id, email, password, is_admin FROM users INNER JOIN permissions ON users.id = permissions.user_id WHERE email is ?", [req.body.email]);
    if(!tempUser){
        res.status(400).send({message: "Incorrect email or password"});
    }
    if(!await bcrypt.compare(req.body.password, tempUser.password)){
        res.status(400).send({message: "Incorrect email or password"});
    }
    const user = tempUser;
    delete user['password'];

    req.session.user = user;

    res.send({message: "we did it"});
});

export default router;