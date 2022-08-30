import { Router } from "express";
import orderController from "../controllers/orderController";
import authMiddleware from "../middlewares/authMiddleware";

const orderRouter = Router();

orderRouter.get("/income", authMiddleware, orderController.getMonthlyIncome);
orderRouter.post("/", authMiddleware, orderController.createOrder);
orderRouter.put("/:id", authMiddleware, orderController.updateOrder);
orderRouter.delete("/:id", authMiddleware, orderController.deleteOrder);
orderRouter.get("/:userId", authMiddleware, orderController.getOrders);

export default orderRouter;
