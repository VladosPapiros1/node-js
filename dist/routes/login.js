"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../controllers/index");
class LoginRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/', (_req, res) => {
            res.render('login');
        });
        this.router.post('/', index_1.ControllerLogin.login.bind(index_1.ControllerLogin));
    }
}
exports.default = new LoginRouter().router;
