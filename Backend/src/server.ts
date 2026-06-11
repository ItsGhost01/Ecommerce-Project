import express from "express";
import cartRoute from "./routes/cart.js";
import authRoute from "./routes/auth";
import productRoute from "./routes/product.js";
import userRoute from "./routes/user.js";
//@ts-ignore
import categoryRoute from "./routes/category.js";
import "./models/index.js"




import cors from "cors";

const app = express();
const port = 5000;

app.use("/uploads",express.static('uploads')); // for images
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);



app.use(express.json());

app.use((req, res, next) => {
  console.log("inside app.use() first");
  next();
});

app.use((req, res, next) => {
  console.log("inside app.use() second");
  next();
});



// ROUTES

app.use("/api", productRoute);
app.use("/api/auth", authRoute);
app.use("/api", categoryRoute);
app.use("/api", cartRoute);
app.use("/api", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
