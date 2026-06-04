import express from "express";



const router = express.Router()
import { getCart, addToCart, deleteCartItem, clearCartItem } from "../controllers/cart";
import checkAuthentication from "../middlewares/checkAuthentication ";


// router.get("/carts", getCart);


 // POST CART
router.post("/cart/add", checkAuthentication, addToCart);

// GET CART
router.get("/cart", checkAuthentication, getCart);

router.delete("/cart/clear", checkAuthentication, clearCartItem);
router.delete("/cart/:id", checkAuthentication, deleteCartItem,);


export default router;