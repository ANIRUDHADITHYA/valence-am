import express from "express";
import { signinWithEmailAndPassword, signupWithEmailAndPassword, forgotPassword, resetPassword, verifyUser, signout, verifyResetToken } from "../controllers/users.controllers.js";
import { verifyAccessToken, fetchUser } from "../middlewares/verifyAccessToken.js";

const router = express.Router();

//user auth endpoints

router.post("/signup", signupWithEmailAndPassword);

router.post("/signin", signinWithEmailAndPassword);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:resetToken", resetPassword);

router.get("/verify-user", verifyAccessToken, fetchUser, verifyUser);

router.get('/verify-reset-token/:resetToken', verifyResetToken);

router.post("/signout", signout);

export { router as UserRouter };