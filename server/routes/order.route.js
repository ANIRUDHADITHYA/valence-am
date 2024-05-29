import express from "express";
import { fetchUser, verifyAccessToken } from "../middlewares/verifyAccessToken.js";
import { createOrder } from "../controllers/orders.controllers.js";

const router = express.Router();

router.post("/create-order", verifyAccessToken, fetchUser, createOrder);

export { router as OrderRouter };