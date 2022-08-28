"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const userRouter = (0, express_1.Router)();
userRouter.put("/:id", authMiddleware_1.default, userController_1.default.updateUser);
userRouter.delete("/:id", authMiddleware_1.default, userController_1.default.deleteUser);
userRouter.get("/stats", authMiddleware_1.default, userController_1.default.getUserStats);
userRouter.get("/:id", authMiddleware_1.default, userController_1.default.getUser);
userRouter.get("/", authMiddleware_1.default, userController_1.default.getAllUser);
exports.default = userRouter;
