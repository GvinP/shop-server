import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?:  JwtPayload;
}

export default function (req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json("Unauthorized");
    }
    const accessToken = authorizationHeader?.split(" ")[1];
    if (!accessToken) {
      return res.status(401).json("Unauthorized");
    }
    const userData = jwt.verify(accessToken, process.env.JWT_SECRET_KEY!);
    req.user = userData as JwtPayload;
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
}
