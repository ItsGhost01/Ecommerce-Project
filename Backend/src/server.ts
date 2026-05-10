import express from "express";
import authRoute from "./routes/auth";
import productRoute from "./routes/product";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.post("/test",(req,res) =>{
  console.log(req.body)

})

// routes
app.use("/api", authRoute);
app.use("/api", productRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});