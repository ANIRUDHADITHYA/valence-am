import express from "express";
import { signinWithEmailAndPassword, signupWithEmailAndPassword, forgotPassword, resetPassword, verifyUser, signout } from "../controllers/user.controllers.js";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";

const router = express.Router();

//user auth endpoints

router.post("/signup", signupWithEmailAndPassword);

router.post("/signin", signinWithEmailAndPassword);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:resetToken", resetPassword);

router.post("/verify-user", verifyAccessToken, verifyUser);

router.post("/sigout", signout);

export { router as UserRouter };