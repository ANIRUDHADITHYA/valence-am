import express from "express";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";
import { createOrder } from "../controllers/orders.controllers.js";

const router = express.Router();

router.post("/create-order", verifyAccessToken, createOrder);

export { router as OrderRouter };