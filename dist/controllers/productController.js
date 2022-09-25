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
const Product_1 = __importDefault(require("../models/Product"));
class productController {
    createProduct(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin)) {
                res.status(403).json("Forbidden");
            }
            try {
                const newProduct = yield Product_1.default.create(req.body);
                yield newProduct.save();
                res.status(200).json(newProduct);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    updateProduct(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin)) {
                res.status(403).json("Forbidden");
            }
            try {
                const { id } = req.params;
                const updatedProduct = yield Product_1.default.findByIdAndUpdate(id, {
                    $set: req.body,
                }, { new: true });
                res.status(200).json(updatedProduct);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    deleteProduct(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin)) {
                res.status(403).json("Forbidden");
            }
            try {
                const { id } = req.params;
                yield Product_1.default.findByIdAndDelete(id);
                res.status(200).json("Product has been deleted");
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const product = yield Product_1.default.findById(id);
                res.status(200).json(product);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const qNew = req.query.new;
                const qCategory = req.query.category;
                let products;
                if (qNew) {
                    products = yield Product_1.default.find().sort({ createdAt: -1 }).limit(5);
                }
                else if (qCategory) {
                    products = yield Product_1.default.find({
                        categories: {
                            $in: [qCategory],
                        },
                    });
                }
                else {
                    products = yield Product_1.default.find();
                }
                res.status(200).json(products);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.default = new productController();
