"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerRegister_1 = require("../controllers/controllerRegister");
class RegisterRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/', (_req, res) => {
            res.render('register');
        });
        this.router.post('/', controllerRegister_1.ControllerRegister.register.bind(controllerRegister_1.ControllerRegister));
    }
}
exports.default = new RegisterRouter().router;
