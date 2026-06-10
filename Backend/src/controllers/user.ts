import { Request, Response } from "express";
import User from "../models/User";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: [
        "firstName", "lastName", "email", "createdAt"
      ]
    });

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get users",
    });
  }
};