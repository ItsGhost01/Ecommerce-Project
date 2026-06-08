import { Request, Response } from "express";
import Cart from "../models/Cart";
import Product from "../models/Product";
import ProductImage from "../models/ProductImage";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";

Cart;

export const getCart = async (req: Request, res: Response) => {
  let cartData = await Cart.findAndCountAll({
    where: {
      userId: req.user?.id,
    },
    include: [
      {
        model: Product,
        as: "products",
        required: true,
        attributes: [
          "id",
          "title",
          "categoryId",
          "price",
          "description",
          "stock",
        ],
        include: [
          {
            model: ProductImage,
            as: "images",
            required: false,
            attributes: ["id", "path"],
          },
          {
            model: User,
            as: "user",
            required: true,
            attributes: ["id", "firstName", "lastName"],
          },
        ],
      },
    ],
  });

  res.send({ 
        data: { 
      total: cartData.count,
       cartData: cartData.rows,
        }
       });

  res.send("list of Cart items");

  //   try {
  // const { id, productId, quantity, userId } = req.body;

  // const cart = await Cart.create({
  //   id,
  //   productId: productId,
  //   userId: req.user?.id,
  //   quantity,
  // });

  //     res.status(201).json({
  //       success: true,
  //       message: "Added to Cart successfully",
  //       data: cart,
  //     });
  //   } catch (error) {
  //     console.log(error);

  //     return res.status(500).json({
  //       success: false,
  //       message: "failed to add to cart",
  //     });
  //   }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    let existingCartItem = await Cart.findOne({
      where: {
        userId: req.user?.id,
        productId: req.body.productId,
      },
    });
    let data;
    if (existingCartItem) {
      data = await existingCartItem.update({
        quantity:
          req.body.quantity !== undefined
            ? Math.max(1, req.body.quantity)
            : existingCartItem.getDataValue("quantity") + 1,
      });
    } else {
      const { id, productId, quantity, userId } = req.body;

      data = await Cart.create({
        productId: req.body.productId,
        userId: req.user?.id,
        quantity: req.body.quantity || 1,
      });
    }

    res.status(201).json({
      success: true,
      message: "Added to Cart successfully",
      data: Cart,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "failed to add to cart",
    });
  }
};

// Clear cart specific item

export const deleteCartItem = async (req: Request, res: Response) => {
  try {
    const cartId = req.params.id;

    const deleted = await Cart.destroy({
      where: {
        id: cartId,
      },
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    return res.json({
      message: "Cart item deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const clearCartItem = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).send("unauthenticated");
    }

    const decoded = jwt.verify(token, "shhhhh") as any;

    const userId = decoded.userInfo?.id;

    if (!userId) {
      return res.status(401).send("invalid token");
    }

    await Cart.destroy({
      where: {
        userId: userId,
      },
    });

    return res.json({
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
