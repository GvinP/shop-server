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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const productRouter_1 = __importDefault(require("./routers/productRouter"));
const cartRouter_1 = __importDefault(require("./routers/cartRouter"));
const orderRouter_1 = __importDefault(require("./routers/orderRouter"));
const paymentRouter_1 = __importDefault(require("./models/paymentRouter"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGODB_URL || "";
exports.app.use(express_1.default.json());
exports.app.get("/", (req, res) => {
    res.send("APP IS RUNNING");
});
exports.app.use('/api/auth', authRouter_1.default);
exports.app.use('/api/user', userRouter_1.default);
exports.app.use('/api/products', productRouter_1.default);
exports.app.use('/api/cart', cartRouter_1.default);
exports.app.use('/api/orders', orderRouter_1.default);
exports.app.use('/api/payment', paymentRouter_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        exports.app.listen(PORT, () => {
            console.log(`Server starts at PORT: ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
start();
