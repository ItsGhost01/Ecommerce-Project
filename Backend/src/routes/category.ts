import express from "express";

import { createCategory, getCategory } from "../controllers/category";
import checkAuthentication from "../middlewares/checkAuthentication ";
import checkIsAdmin from "../middlewares/checkIsAdmin";
const router = express.Router()

// // GET PRODUCTS
router.get("/category", getCategory);

// CREATE PRODUCT
router.post("/category/add", checkAuthentication, checkIsAdmin, createCategory);


export default router;