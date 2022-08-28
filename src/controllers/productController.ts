import { Request, Response } from "express";
import Product from "../models/Product";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middlewares/authMiddleware";

class productController {
  async createProduct(req: AuthRequest, res: Response) {
    try {
      res.status(200).json({});
    } catch (error) {
      res.status(500).json(error);
    }
  }
  
}

export default new productController();
