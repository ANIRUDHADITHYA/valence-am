import express from "express";
import { addProduct, getAllProducts, getProductByProcessID, getProductByProductID } from "../controllers/products.controllers.js";

const router = express.Router();

//products endpoints
router.get("/", getAllProducts);

router.get("/process/:process_id", getProductByProcessID);

router.get("/product/:product_id", getProductByProductID);

router.post("/add-product", addProduct);



export { router as ProductRouter };