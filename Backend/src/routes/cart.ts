import express from "express";



const router = express.Router()
import { getCarts } from "../controllers/cart";
import checkAuthentication from "../middlewares/checkAuthentication ";





router.get("/carts", getCarts);

 // CREATE PRODUCT
// router.post("/seller/product/add", checkAuthentication, createProduct);

// GET PRODUCTS
router.get("/carts", checkAuthentication, getCarts);

export default router;