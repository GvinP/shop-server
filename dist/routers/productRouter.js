"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = __importDefault(require("../controllers/productController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const productRouter = (0, express_1.Router)();
productRouter.post("/", authMiddleware_1.default, productController_1.default.createProduct);
productRouter.put("/:id", authMiddleware_1.default, productController_1.default.updateProduct);
productRouter.delete("/:id", authMiddleware_1.default, productController_1.default.deleteProduct);
productRouter.get("/:id", productController_1.default.getProduct);
productRouter.get("/", productController_1.default.getAllProducts);
exports.default = productRouter;
