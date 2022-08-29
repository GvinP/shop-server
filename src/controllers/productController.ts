import { Request, Response } from "express";
import Product from "../models/Product";
import { AuthRequest } from "../middlewares/authMiddleware";

class productController {
  async createProduct(req: AuthRequest, res: Response) {
    if (!req.user?.isAdmin) {
      res.status(403).json("Forbidden");
    }
    try {
      const newProduct = await Product.create(req.body);
      await newProduct.save();
      res.status(200).json(newProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async updateProduct(req: AuthRequest, res: Response) {
    if (!req.user?.isAdmin) {
      res.status(403).json("Forbidden");
    }
    try {
      const { id } = req.params;
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteProduct(req: AuthRequest, res: Response) {
    if (!req.user?.isAdmin) {
      res.status(403).json("Forbidden");
    }
    try {
      const { id } = req.params;
      await Product.findByIdAndDelete(id);
      res.status(200).json("Product has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAllProducts(req: Request, res: Response) {
    try {
      const qNew = req.query.new;
      const qCategory = req.query.category;
      let products
     if(qNew) {
      products = await Product.find().sort({createdAt: -1}).limit(5)
     } else if(qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory]
        }
      })
     } else {
      products = await Product.find()
     }

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new productController();
