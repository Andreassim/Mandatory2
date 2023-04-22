import { Router } from "express";
const router = router();

router.get("/user", (req, res) => {
    res.send({user: "hello"})
})

export default router;