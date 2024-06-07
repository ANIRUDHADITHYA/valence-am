import express from "express";
import { addProduct, getAllProducts, getproductByID, updateProductById, hideProductById, unHideProductById, getActiveProducts } from "../controllers/products.controllers.js";
import { verifyAdminAccessToken } from "../middlewares/verifyAccessToken.js";

const router = express.Router();

//products endpoints
router.get("/", verifyAdminAccessToken, getAllProducts);

router.get("/active", getActiveProducts);

router.post("/product/add-product", verifyAdminAccessToken, addProduct);

router.get("/product/:productID", verifyAdminAccessToken, getproductByID);

router.put('/product/update-product/:productID', verifyAdminAccessToken, updateProductById);

router.put('/product/hide-product/:productID', verifyAdminAccessToken, hideProductById);

router.put('/product/unhide-product/:productID', verifyAdminAccessToken, unHideProductById);


export { router as ProductRouter };