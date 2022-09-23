"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = __importDefault(require("../controllers/orderController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const orderRouter = (0, express_1.Router)();
orderRouter.get("/income", authMiddleware_1.default, orderController_1.default.getMonthlyIncome);
orderRouter.post("/", authMiddleware_1.default, orderController_1.default.createOrder);
orderRouter.get("/", authMiddleware_1.default, orderController_1.default.getAllOrders);
orderRouter.put("/:id", authMiddleware_1.default, orderController_1.default.updateOrder);
orderRouter.delete("/:id", authMiddleware_1.default, orderController_1.default.deleteOrder);
orderRouter.get("/:userId", authMiddleware_1.default, orderController_1.default.getOrders);
exports.default = orderRouter;
