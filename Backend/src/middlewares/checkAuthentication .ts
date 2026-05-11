import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";
import { User } from "../types/User.js";


const checkAuthentication = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization?.split(" ")[1]

    if (token) {

        try {
            let decoded = jwt.verify(token, 'shhhhh') as User;
            req.user = decoded;
            console.log(decoded);
            next()

        } catch (err) {
            res.status(401).send("unauthenticated.")
        }
    } else {
        return res.status(401).send("unauthenticated.")
    }
}

export default checkAuthentication