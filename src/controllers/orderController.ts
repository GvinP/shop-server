import { Request, Response } from "express";
import Order from "../models/Order";
import { AuthRequest } from "../middlewares/authMiddleware";

class orderController {
  async createOrder(req: AuthRequest, res: Response) {
    try {
      const newOrder = await Order.create(req.body);
      await newOrder.save();
      res.status(200).json(newOrder);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async updateOrder(req: AuthRequest, res: Response) {
    if (!req.user?.isAdmin) {
      res.status(403).json("Forbidden");
    }
    try {
      const { id } = req.params;
      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteOrder(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      await Order.findByIdAndDelete(id);
      res.status(200).json("Order has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getOrders(req: AuthRequest, res: Response) {
    try {
      const { userId } = req.params;
      const orders = await Order.find({ user: userId });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAllOrders(req: AuthRequest, res: Response) {
    if (!req.user?.isAdmin) {
      res.status(403).json("Forbidden");
    }
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getMonthlyIncome(req: AuthRequest, res: Response) {
    if (!req.user?.isAdmin) {
      res.status(403).json("Forbidden");
    }
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previosMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );
    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previosMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new orderController();
