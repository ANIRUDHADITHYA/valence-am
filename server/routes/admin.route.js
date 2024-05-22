import express from "express";
import { verifyAdminAccessToken, fetchAdmin } from "../middlewares/verifyAccessToken.js";
import { signinWithEmailAndPasswordAdmin, signupWithEmailAndPasswordAdmin, verifyAdmin, signout } from "../controllers/admins.controllers.js";

const router = express.Router();

//admin auth endpoints

router.post("/signup", signupWithEmailAndPasswordAdmin);

router.post("/signin", signinWithEmailAndPasswordAdmin);

router.get("/verify-admin", verifyAdminAccessToken, fetchAdmin, verifyAdmin);

router.post("/signout", signout);

export { router as AdminRouter };