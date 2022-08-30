"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = __importDefault(require("../controllers/paymentController"));
const paymentRouter = (0, express_1.Router)();
paymentRouter.post("/", paymentController_1.default.createPayment);
exports.default = paymentRouter;
