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
const Cart_1 = __importDefault(require("../models/Cart"));
class cartController {
    createCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCart = yield Cart_1.default.create(req.body);
                yield newCart.save();
                res.status(200).json(newCart);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    updateCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updatedCart = yield Cart_1.default.findByIdAndUpdate(id, {
                    $set: req.body,
                }, { new: true });
                res.status(200).json(updatedCart);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    deleteCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield Cart_1.default.findByIdAndDelete(id);
                res.status(200).json("Cart has been deleted");
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const cart = yield Cart_1.default.findOne({ user: id });
                res.status(200).json(cart);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getAllCarts(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin)) {
                res.status(403).json("Forbidden");
            }
            try {
                const carts = yield Cart_1.default.find();
                res.status(200).json(carts);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.default = new cartController();
