import { Request, Response } from "express";
import Product from "../models/Product";
import ProductImage from "../models/ProductImage";
import User from "../models/User";

// CREATE PRODUCT
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { Title, Price, Description, Stock, image, UserId } = req.body;

    const product = await Product.create({
      Title,
      Price,
      Description,
      Stock,
      image,
      UserId: req.user?.id,
    });

    //@ts-ignore
    req.files?.forEach(el => {
      ProductImage.create({
        path:el.path,
        productId:product.getDataValue("id")
      })
    })

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};

// GET ALL PRODUCTS
export const getProducts = async (req: Request, res: Response) => {
  try {

    console.log(req.query);
    let limit = 5;
    let offset = 0;

    if (req.query.limit) {
        limit = parseInt(req.query.limit as string)
    }
    let products = await Product.findAll({
      limit: limit,
      offset: offset,
        include: [
    {
      model: ProductImage,
      as: "images", // IMPORTANT (must match association alias)
    },
      ],
    });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};