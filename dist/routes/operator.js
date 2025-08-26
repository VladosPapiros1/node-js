"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../middleware/index");
class OperatorRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/', index_1.AuthMiddleware.validToken, (req, res) => {
            const user = req.user;
            res.render('operator', { username: user.username, clients: {} });
        });
    }
}
exports.default = new OperatorRouter().router;
