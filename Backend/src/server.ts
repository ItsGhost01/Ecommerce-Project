// src/index.ts
import express from 'express';
import authRoute from "./routes/auth";
import productRoute from "./routes/product";



const app = express()
const port = 3000

app.use(express.json());
app.use(authRoute);
app.use(productRoute);

app.get('/', (req, res) => {
  res.send("Hello World!")
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})