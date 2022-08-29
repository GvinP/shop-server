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
const User_1 = __importDefault(require("../models/User"));
class userController {
    updateUser(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (id !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                    res.status(403).json("Forbidden");
                }
                const updatedUser = yield User_1.default.findByIdAndUpdate(id, {
                    $set: req.body,
                }, { new: true });
                res.status(200).json(updatedUser);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    deleteUser(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin)) {
                    res.status(403).json("Forbidden");
                }
                yield User_1.default.findByIdAndDelete(id);
                res.status(200).json("User has been deleted");
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getUser(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log('getUser ', req.user);
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin)) {
                    res.status(403).json("Forbidden");
                }
                const user = yield User_1.default.findById(id);
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getAllUsers(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.query.new;
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin)) {
                    res.status(403).json("Forbidden");
                }
                const users = query
                    ? yield User_1.default.find().sort({ _id: -1 }).limit(5)
                    : yield User_1.default.find();
                res.status(200).json(users);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getUsersStats(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin)) {
                    res.status(403).json("Forbidden");
                }
                const date = new Date();
                const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
                const data = yield User_1.default.aggregate([
                    { $match: { createdAt: { $gte: lastYear } } },
                    {
                        $project: {
                            month: { $month: "$createdAt" }
                        }
                    },
                    {
                        $group: {
                            _id: "$month",
                            total: { $sum: 1 }
                        }
                    }
                ]);
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.default = new userController();
