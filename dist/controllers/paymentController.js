"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const yoo_checkout_1 = require("@a2seven/yoo-checkout");
const uuid_1 = require("uuid");
class paymentController {
    createPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkout = new yoo_checkout_1.YooCheckout({
                shopId: process.env.SHOP_ID,
                secretKey: process.env.PAYMENTS_SECRET_KEY,
            });
            const idempotenceKey = (0, uuid_1.v4)();
            const { amount } = req.body;
            const createPayload = {
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
                const payment = yield checkout.createPayment(createPayload, idempotenceKey);
                res.status(200).json(payment);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.default = new paymentController();
