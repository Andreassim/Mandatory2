import { Router } from "express";
import { requireAdmin, requireUser } from "../middelware/authorizer.js";
import db from "../database/connection.js";
const router = Router();

router.get("/messages", requireUser, async (req, res) => {
    const messages = await db.all("SELECT id, message, is_censored FROM messages WHERE user_id = ?", [req.session.user.id]);

    const data = messages.map(message => {
        const result = {};
        if(message.is_censored == 'true' || message.is_censored == 1){
            result.message = "**** CENSORED ****";
        }else {
            result.message = message.message;
            
        };
        result.id = message.id;
        return result;
    });

    res.status(200).send({data: data});
});

router.post("/messages", requireUser, async (req, res) => {
    const { lastID } = await db.run("INSERT INTO messages (user_id, message) VALUES (?, ?)", [req.session.user.id, req.body.message]);

    res.status(200).send({
        message: "message created",
        data: {
            id: lastID,
            message: req.body.message
        }   
    });
});

router.patch("/messages/:id", requireUser ,requireAdmin, async (req, res) => {
    const isCensored = req.body.is_censored == "on" ? true : false;
    console.log(isCensored);
    const messageId = req.params.id;
    const { changes } = await db.run("UPDATE messages SET is_censored = ? WHERE id = ? ", [isCensored, messageId]);

    console.log(changes);

    res.status(200).send({
        data: {
            changes: changes,
        }   
    });
});

export default router;