import { Router } from "express";
import productController from "../controllers/productController";
import authMiddleware from "../middlewares/authMiddleware";


const productRouter = Router();

productRouter.post("/", authMiddleware, productController.createProduct);
productRouter.put("/:id", authMiddleware, productController.updateProduct);
productRouter.delete("/:id", authMiddleware, productController.deleteProduct);
productRouter.get("/:id", productController.getProduct);
productRouter.get("/", productController.getAllProducts);


export default productRouter;
