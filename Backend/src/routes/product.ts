import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router()
import { createProduct, getProducts } from "../controllers/product";
import checkAuthentication from "../middlewares/checkAuthentication ";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + extension
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })
router.get("/products", getProducts);

// CREATE PRODUCT
router.post("/seller/product/add", checkAuthentication, upload.array("image", 12), createProduct);

// // GET PRODUCTS
// router.get("/products", getProducts);

export default router;