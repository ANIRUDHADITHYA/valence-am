import express from "express";
import { createBASTicket, createTicket } from "../controllers/forms.controllects.js";

const router = express.Router();

router.post("/getin-touch", createTicket);

router.post("/become-a-supplier", createBASTicket);

export { router as FormsRouter };