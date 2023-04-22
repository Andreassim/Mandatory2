import { Router } from "express";
const router = router();

router.get("/user/:id", (req, res) => {
    res.send({user: "hello"})
})

export default router;