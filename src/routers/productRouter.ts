import { Router } from "express";
import productController from "../controllers/productController";


const productRouter = Router();

productRouter.post("/", productController.createProduct);


export default productRouter;
