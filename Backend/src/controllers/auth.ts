import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from "jsonwebtoken"


export const login = async (req: Request, res: Response) => {
   try {
        // zod  validation: 
        let user = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        // @ts-ignore

        let hashedPw = user?.getDataValue("password");
        let userInfo = user?.toJSON();
        delete userInfo?.password;
        if (userInfo) {
            let matched = await bcrypt.compare(req.body.password, hashedPw);
            console.log({ matched });
            // generate jwt token 
            if (matched) {
                let token = jwt.sign({ userInfo,  }, 'shhhhh');
                return res.send({
                    msg: "login success",
                    user: userInfo,
                    token:token
                })
            }
        }
        res.status(401).send({
            msg: "Invalid creadentials"
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            msg: "Server Error. please try again later.."
        })
    }
}

export const signup = async (req: Request, res: Response) => {

  try {
    let hashedPw = await bcrypt.hash(req.body.password, 10);

    await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPw,
      isSeller:req.body.isSeller
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log("error", err)
    res.status(500).send("server error");
  }
}

 export const getUser = async (req: Request, res: Response) => {
     let token = req.headers.authorization?.split(" ")[1];
   
       if (!token) {
           return res.status(401).send("unauthenticated");
       }
   
       try {
           let decoded = jwt.verify(token , 'shhhhh') as JwtPayload;
           console.log(decoded);
           res.send(decoded)

           let user = await User.findByPk(decoded.id)
           if(user){
            res.send(user)
           }
       } catch(err){
        res.status(401).send("unauthenticated")
        console.log(err)
       }
  }