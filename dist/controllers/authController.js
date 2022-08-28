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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = req.body;
                const encryptedPassword = crypto_js_1.default.AES.encrypt(password, process.env.SECRET_PHRASE).toString();
                const newUser = yield User_1.default.create({
                    username,
                    email,
                    password: encryptedPassword,
                });
                yield newUser.save();
                res.status(201).json(newUser);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password: userPassword } = req.body;
                const user = yield User_1.default.findOne({ email });
                console.log(user);
                if (!user) {
                    res.status(401).json("Unauthorized");
                }
                const decryptedPassword = crypto_js_1.default.AES.decrypt(user === null || user === void 0 ? void 0 : user.password, process.env.SECRET_PHRASE);
                if (userPassword !== decryptedPassword.toString(crypto_js_1.default.enc.Utf8)) {
                    res.status(401).json("Unauthorized");
                }
                const accessToken = jsonwebtoken_1.default.sign({
                    id: user === null || user === void 0 ? void 0 : user._id,
                    username: user === null || user === void 0 ? void 0 : user.username,
                    email: user === null || user === void 0 ? void 0 : user.email,
                    isAdmin: user === null || user === void 0 ? void 0 : user.isAdmin
                }, process.env.JWT_SECRET_KEY, { expiresIn: "30m" });
                //@ts-ignore
                const _a = user._doc, { password } = _a, other = __rest(_a, ["password"]);
                res.status(200).json({
                    user: other,
                    accessToken
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.default = new AuthController();
