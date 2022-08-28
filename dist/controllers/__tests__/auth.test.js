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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../../index");
describe("/login", () => {
    it("should return 200 and user", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            email: 'user@mail.com',
            password: '12345678'
        };
        const response = yield (0, supertest_1.default)(index_1.app)
            .post("/api/auth/login")
            .send(user)
            .expect(200);
        const { username, email } = response.body;
        expect(username).toBe('user');
        expect(email).toBe('user@mail.com');
    }));
});
