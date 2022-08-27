import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req:any,res:any)=>{
    res.send('user')
});

export default userRouter;
