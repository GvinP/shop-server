"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartController_1 = __importDefault(require("../controllers/cartController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const cartRouter = (0, express_1.Router)();
cartRouter.get("/:id", authMiddleware_1.default, cartController_1.default.getCart);
cartRouter.post("/", authMiddleware_1.default, cartController_1.default.createCart);
cartRouter.delete("/:id", authMiddleware_1.default, cartController_1.default.deleteCart);
cartRouter.put("/:id", authMiddleware_1.default, cartController_1.default.updateCart);
cartRouter.get("/", authMiddleware_1.default, cartController_1.default.getAllCarts);
exports.default = cartRouter;
