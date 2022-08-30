import { YooCheckout, ICreatePayment } from "@a2seven/yoo-checkout";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Request, Response } from "express";
import { v4 } from "uuid";

class paymentController {
  async createPayment(req: AuthRequest, res: Response) {
    const checkout = new YooCheckout({
        shopId: process.env.SHOP_ID!,
        secretKey: process.env.PAYMENTS_SECRET_KEY!,
      });
    const idempotenceKey = v4();
    const {amount} = req.body
    const createPayload: ICreatePayment = {
      amount: {
        value: amount,
        currency: "RUB",
      },
      payment_method_data: {
        type: "bank_card",
      },
      confirmation: {
        type: "redirect",
        return_url: "https://gvinp.github.io/shop",
      },
    };

    try {
      const payment = await checkout.createPayment(
        createPayload,
        idempotenceKey
      );
      res.status(200).json(payment)
    } catch (error) {
        res.status(500).json(error)
    }
  }
}

export default new paymentController();