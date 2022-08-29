import { Request, Response } from "express";
import Cart from "../models/Cart";
import { AuthRequest } from "../middlewares/authMiddleware";

class cartController {
  async createCart(req: AuthRequest, res: Response) {
    try {
      const newCart = await Cart.create(req.body);
      await newCart.save();
      res.status(200).json(newCart);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async updateCart(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const updatedCart = await Cart.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteCart(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      await Cart.findByIdAndDelete(id);
      res.status(200).json("Cart has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getCart(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const cart = await Cart.findOne({user: id});
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAllCarts(req: AuthRequest, res: Response) {
    if (!req.user?.isAdmin) {
        res.status(403).json("Forbidden");
      }
    try {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch (error) {
      res.status(500).json(error);
    }
  }

}

export default new cartController();
