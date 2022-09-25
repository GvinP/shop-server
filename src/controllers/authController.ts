import { Request, Response } from "express";
import User from "../models/User";
import CryptoJS from "crypto-js";
import jwt from 'jsonwebtoken'

class AuthController {
  async registration(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        process.env.SECRET_PHRASE!
      ).toString();
      
      const newUser = await User.create({
        username,
        email,
        password: encryptedPassword,
      });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password: userPassword } = req.body;
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(401).json("Unauthorized");
      }
      const decryptedPassword = CryptoJS.AES.decrypt(
        user?.password!,
        process.env.SECRET_PHRASE!
      );

      if (userPassword !== decryptedPassword.toString(CryptoJS.enc.Utf8)) {
        return res.status(401).json("Unauthorized");
      }
      const accessToken = jwt.sign({
        id: user?._id,
        username: user?.username,
        email: user?.email,
        isAdmin: user?.isAdmin
      }, process.env.JWT_SECRET_KEY!, {expiresIn: "30m"})
      //@ts-ignore
      const { password, ...other } = user._doc;
      res.status(200).json({
        user: other,
        accessToken
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

}

export default new AuthController();
