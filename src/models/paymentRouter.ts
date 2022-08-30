import { Router } from "express";
import paymentController from "../controllers/paymentController";
import authMiddleware from "../middlewares/authMiddleware";

const paymentRouter = Router();


paymentRouter.post("/", paymentController.createPayment);

export default paymentRouter;
