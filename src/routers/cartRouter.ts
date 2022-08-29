import { Router } from "express";
import cartController from "../controllers/cartController";
import authMiddleware from "../middlewares/authMiddleware";

const cartRouter = Router();

cartRouter.get("/:id", authMiddleware, cartController.getCart);
cartRouter.post("/", authMiddleware, cartController.createCart);
cartRouter.delete("/:id", authMiddleware, cartController.deleteCart);
cartRouter.put("/:id", authMiddleware, cartController.updateCart);
cartRouter.get("/", authMiddleware, cartController.getAllCarts);

export default cartRouter;
