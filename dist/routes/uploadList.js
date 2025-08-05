"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../models/index");
const index_2 = require("../middleware/index");
class UploadListRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/', index_2.AuthMiddleware.validToken, async (req, res) => {
            const userId = req.user?.id;
            try {
                const logs = await index_1.FileUpload.findAll({
                    where: { userId },
                    order: [['createdAt', 'DESC']],
                });
                res.render('upload-list', { logs });
            }
            catch (error) {
                console.error('Помилка при завантаженні файлів:', error);
                res.status(500).send('Внутрішня помилка сервера');
            }
        });
    }
}
exports.default = new UploadListRouter().router;
