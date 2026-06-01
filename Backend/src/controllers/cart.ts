import { Request, Response } from "express";
import Cart from "../models/Cart";

export const getCarts = async (req: Request, res: Response) => {

    res.send("list of Cart items")
//   try {
//     const { id, productId, quantity, userId } = req.body;

//     const cart = await Cart.create({
//       id,
//       productId: productId,
//       userId: req.user?.id,
//       quantity,
//     });

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