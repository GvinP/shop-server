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
const Order_1 = __importDefault(require("../models/Order"));
class orderController {
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newOrder = yield Order_1.default.create(req.body);
                yield newOrder.save();
                res.status(200).json(newOrder);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    updateOrder(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin)) {
                res.status(403).json("Forbidden");
            }
            try {
                const { id } = req.params;
                const updatedOrder = yield Order_1.default.findByIdAndUpdate(id, {
                    $set: req.body,
                }, { new: true });
                res.status(200).json(updatedOrder);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    deleteOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield Order_1.default.findByIdAndDelete(id);
                res.status(200).json("Order has been deleted");
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const orders = yield Order_1.default.find({ user: userId });
                res.status(200).json(orders);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getAllOrders(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin)) {
                res.status(403).json("Forbidden");
            }
            try {
                const orders = yield Order_1.default.find();
                res.status(200).json(orders);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getMonthlyIncome(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin)) {
                res.status(403).json("Forbidden");
            }
            const productId = req.query.id;
            const date = new Date();
            const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
            const previosMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
            try {
                const income = yield Order_1.default.aggregate([
                    {
                        $match: Object.assign({ createdAt: { $gte: previosMonth } }, (productId && {
                            products: { $elemMatch: { productId } },
                        })),
                    },
                    {
                        $project: {
                            month: { $month: "$createdAt" },
                            sales: "$amount",
                        },
                    },
                    {
                        $group: {
                            _id: "$month",
                            total: { $sum: "$sales" },
                        },
                    },
                ]);
                res.status(200).json(income);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.default = new orderController();
