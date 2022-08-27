import { Router } from "express";

const productRouter = Router();

productRouter.get("/", (req:any,res:any)=>{
    res.send('user')
});

export default productRouter;
