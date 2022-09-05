import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import userRouter from "./routers/userRouter";
import authRouter from "./routers/authRouter";
import productRouter from "./routers/productRouter";
import cartRouter from "./routers/cartRouter";
import orderRouter from "./routers/orderRouter";
import paymentRouter from "./models/paymentRouter";

dotenv.config();

export const app = express();

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGODB_URL || "";

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("APP IS RUNNING");
});


app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', orderRouter)
app.use('/api/payment', paymentRouter)

const start = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    app.listen(PORT, () => {
      console.log(`Server starts at PORT: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
