import Category from "../models/Category.js";
import { Request, Response } from "express";

export const getCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findAll({
      where: {
        parentId: null
      },
      include: {
        model: Category, 
        as: "subCategories"
      }
    });
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch Category",
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const data = await Category.create({
      title: req.body.title,
      parentId: req.body.parentId || null,
    });
    res.status(200).json({
      success: true,
      data: data,
      message: "Category Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create Category",
    });
  }
};