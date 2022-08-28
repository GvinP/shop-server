"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function default_1(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json("Unauthorized");
        }
        const accessToken = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(" ")[1];
        if (!accessToken) {
            return res.status(401).json("Unauthorized");
        }
        const userData = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET_KEY);
        req.user = userData;
        next();
    }
    catch (error) {
        return res.status(500).json(error);
    }
}
exports.default = default_1;
