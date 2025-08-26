"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../middleware/index");
const index_2 = require("../controllers/index");
const index_3 = require("../middleware/index");
class UploadRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const upload = index_3.UploadMulter.getMulterInstance();
        this.router.get('/', index_1.AuthMiddleware.validToken, index_2.UploadController.showUploadPage);
        this.router.post('/', index_1.AuthMiddleware.validToken, upload.single('file'), index_2.UploadController.handleUpload);
    }
}
exports.default = new UploadRouter().router;
