import express from "express";


const router = express.Router()
import { createCategory, getCategory } from "../controllers/category";
import checkAuthentication from "../middlewares/checkAuthentication ";

// // GET PRODUCTS
router.get("/category", getCategory);

// CREATE PRODUCT
router.post("/category/add", checkAuthentication, createCategory);


export default router;