"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const index_1 = require("../middleware/index");
const index_2 = require("../controllers/index");
class UploadRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const UPLOADS_DIR = path_1.default.resolve(__dirname, '..', 'uploads');
        if (!fs_1.default.existsSync(UPLOADS_DIR)) {
            fs_1.default.mkdirSync(UPLOADS_DIR, { recursive: true });
        }
        const upload = (0, multer_1.default)({ dest: UPLOADS_DIR });
        this.router.get('/', index_1.AuthMiddleware.validToken, index_2.UploadController.showUploadPage);
        this.router.post('/', index_1.AuthMiddleware.validToken, upload.single('file'), index_2.UploadController.handleUpload);
    }
}
exports.default = new UploadRouter().router;
