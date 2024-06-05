import express from "express";
import { fetchAdmin, fetchUser, verifyAccessToken, verifyAdminAccessToken } from "../middlewares/verifyAccessToken.js";
import { createOrder, getAllOrders } from "../controllers/orders.controllers.js";

const router = express.Router();

router.post("/create-order", verifyAccessToken, fetchUser, createOrder);

router.get("/get-all-orders", verifyAdminAccessToken, fetchAdmin, getAllOrders);

export { router as OrderRouter };