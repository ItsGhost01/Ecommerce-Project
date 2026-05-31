import { Request, Response } from "express";
import Product from "../models/Product";
import ProductImage from "../models/ProductImage";
import User from "../models/User";
import Category from "../models/Category";
import { Op, Order } from "sequelize";

// CREATE PRODUCT
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, categoryId, price, description, stock, image } = req.body;

    const product = await Product.create({
      title,
      categoryId: categoryId,
      price,
      description,
      stock,
      image,
      userId: req.user?.id,
    });

    //@ts-ignore
    req.files?.forEach((el) => {
      ProductImage.create({
        path: el.path,
        productId: product.getDataValue("id"),
      });
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create Product",
    });
  }
};

// GET ALL PRODUCTS
export const getProducts = async (req: Request, res: Response) => {
  try {
    console.log(req.query);
    let limit = 10;
    let page = 1;
    let sort = ["createdAt", "DESC"];
    let searchText = "";

    let offset = (page - 1) * limit;

    let categoryIds: string[] = [];
    if (req.query.categoryIds) {
      categoryIds = (req.query.categoryIds as string).split(",");
    }

    let whereCategoryCondition = {};

    if (categoryIds.length > 0) {
      whereCategoryCondition = {
        [Op.or]: [
          {
            id: {
          [Op.in]: categoryIds
          }
        },
        {
            parentId: {
          [Op.in]: categoryIds
          }
        },
      ]
      };
    }

    if (req.query.q) {
      searchText = req.query.q as string;
    }

    if (req.query.limit) {
      limit = parseInt(req.query.limit as string);
    }

    if (req.query.page) {
      page = parseInt(req.query.page as string);
    }
    if (req.query.offset) {
      offset = parseInt(req.query.offset as string);
    }

    if (req.query.sort) {
      switch (req.query.sort) {
        case "oldest": {
          sort = ["createdAt", "ASC"];
          break;
        }
        case "PriceAsc": {
          sort = ["price", "ASC"];
          break;
        }
        case "priceDesc": {
          sort = ["price", "DESC"];
          break;
        }
        default: {
          sort = ["createdAt", "DESC"];
          break;
        }
      }
    }
    let productData = await Product.findAndCountAll({
      where: {
        title: {
          [Op.iLike]: searchText ? `%${searchText}%` : `%`,
        },
      },

      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "title", "parentId"],
          where: whereCategoryCondition,
        },

        {
          model: ProductImage,
          as: "images",
          attributes: ["id", "path"],
        },
      ],
      limit: limit,
      order: [sort] as Order,
    });

    res.send({
      success: true,
      data: {
        total: productData.count,
        limit: limit,
        page: 1,
        products: productData.rows,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};
