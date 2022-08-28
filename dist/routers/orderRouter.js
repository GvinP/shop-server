"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderRouter = (0, express_1.Router)();
orderRouter.get("/", (req, res) => {
    res.send('user');
});
exports.default = orderRouter;
