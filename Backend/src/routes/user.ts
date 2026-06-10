import express from "express";

import { getUsers } from "../controllers/user";

// import checkAuthentication from "../middlewares/checkAuthentication ";
// import checkIsAdmin from "../middlewares/checkIsAdmin";
const router = express.Router()

// // GET PRODUCTS
router.get("/users", getUsers );

// CREATE Users
// router.post("/user/add", checkAuthentication, checkIsAdmin, c);


export default router;