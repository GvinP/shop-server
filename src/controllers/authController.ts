import { Request, Response, NextFunction } from "express";
import User from "../models/User";

class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body;
      const newUser = await User.create({ username, email, password });
      await newUser.save()
      res.json(newUser)
    } catch (error) {
      console.log(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AuthController();
