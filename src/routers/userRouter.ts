import { Router } from "express";
import userController from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const userRouter = Router();

userRouter.put("/:id", authMiddleware, userController.updateUser);
userRouter.delete("/:id", authMiddleware, userController.deleteUser);
userRouter.get("/stats", authMiddleware, userController.getUsersStats);
userRouter.get("/:id", authMiddleware, userController.getUser);
userRouter.get("/", authMiddleware, userController.getAllUsers);

export default userRouter;
