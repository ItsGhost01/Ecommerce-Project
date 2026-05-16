import { NextFunction, Request, Response } from "express"

const checkIsAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.isAdmin){

    next()
  }
  else{
      
      return res.status(403).send({
          msg: "Acesss denied"
        })
  }
}

export default checkIsAdmin