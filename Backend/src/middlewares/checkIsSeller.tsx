import { NextFunction, Request, Response } from "express"

const checkIsSeller = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.isSeller){

    next()
  }
  else{
      
      return res.status(403).send({
          msg: "Acesss denied"
        })
  }
}

export default checkIsSeller