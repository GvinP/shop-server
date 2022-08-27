import { Router } from "express";

const cartRouter = Router();

cartRouter.get("/", (req:any,res:any)=>{
    res.send('user')
});

export default cartRouter;
