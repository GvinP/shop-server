import { Request, Response } from "express";
import User from "../models/User";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middlewares/authMiddleware";

class userController {
  async updateUser(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      if (id !== req.user?.id) {
        res.status(403).json("Forbidden");
      }
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteUser(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      if (!req.user?.isAdmin) {
        res.status(403).json("Forbidden");
      }
      await User.findByIdAndDelete(id);
      res.status(200).json("User has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getUser(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      console.log('getUser ',req.user);

      if (!req.user?.isAdmin) {
        res.status(403).json("Forbidden");
      }
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAllUsers(req: AuthRequest, res: Response) {
    try {
      const query = req.query.new;
      if (!req.user?.isAdmin) {
        res.status(403).json("Forbidden");
      }
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getUsersStats(req: AuthRequest, res: Response) {
    try {
      if (!req.user?.isAdmin) {
        res.status(403).json("Forbidden");
      }
      const date = new Date()
      const lastYear = new Date(date.setFullYear(date.getFullYear()-1))

      const data = await User.aggregate([
        {$match: {createdAt: {$gte: lastYear}}},
        {
          $project: {
            month: { $month: "$createdAt"}
          }
        },
        {
          $group: {
            _id: "$month",
            total: {$sum: 1}
          }
        }
      ]);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new userController();
