import express from "express";
import { addProduct, getAllProducts, getProductByProcessID, getProductByProductID, getProductByCategoryID } from "../controllers/products.controllers.js";
import { verifyAdminAccessToken } from "../middlewares/verifyAccessToken.js";

const router = express.Router();

//products endpoints
router.get("/", getAllProducts);

router.post("/add-product", verifyAdminAccessToken, addProduct);




export { router as ProductRouter };