import { Request, Response } from "express";
import Product from "../models/Product";

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
      UserId,
    });

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
    const products = await Product.findAll();

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