import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from 'bcrypt';

export const login = (req: Request, res: Response) => {
  res.send("login");
};

export const signup = async (req: Request, res: Response) => {

  try {
    let hashedPw = await bcrypt.hash(req.body.password, 10);

    await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPw
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log("error", err)
    res.status(500).send("server error");
  }
};