import express from "express";
import { loginUser, myProfile, verifyUser } from "../controller/user.controller.js";
import { isAuth } from "../middleware/isAuth.middleware.js";

const router = express.Router();

router.post("/user/login", loginUser);
router.post("/user/verify",verifyUser )
router.get("/user/me", isAuth, myProfile)

export default router;