"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartRouter = (0, express_1.Router)();
cartRouter.get("/", (req, res) => {
    res.send('user');
});
exports.default = cartRouter;
