import express from "express";
import jwt from "jsonwebtoken";
import { createProduct, getProducts } from "../controllers/product";

const router = express.Router();

// CREATE PRODUCT
router.post("/", (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).send("unauthenticated");
    }

    try {
        jwt.verify(token, "shhhhh");
        next(); // go to controller
    } catch (err) {
        return res.status(401).send("Invalid token");
    }
}, createProduct);

// GET PRODUCTS
router.get("/", getProducts);

export default router;