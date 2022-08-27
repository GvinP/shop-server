import { Router } from "express";

const orderRouter = Router();

orderRouter.get("/", (req:any,res:any)=>{
    res.send('user')
});

export default orderRouter;
