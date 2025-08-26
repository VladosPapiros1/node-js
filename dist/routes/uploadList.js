"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../middleware/index");
const index_2 = require("../controllers/index");
class UploadListRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/', index_1.AuthMiddleware.validToken, index_2.ControllerUploadList.getAllUploads);
        this.router.post('/deleteAll', index_1.AuthMiddleware.validToken, index_2.ControllerUploadList.deleteAllUploads);
        this.router.post('/delete/:fileName', index_1.AuthMiddleware.validToken, index_2.ControllerUploadList.deleteOneUpload);
    }
}
exports.default = new UploadListRouter().router;
