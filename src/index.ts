import express from "express";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import userRouter from "./routers/userRouter";
import authRouter from "./routers/authRouter";

dotenv.config();

export const app = express();

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGODB_URL || "";

app.use(express.json())

app.get("/", (req, res) => {
  res.send("APP IS RUNNING");
});


app.use('/api/auth', authRouter)

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
