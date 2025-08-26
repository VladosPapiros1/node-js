"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const index_1 = require("../models/index");
const index_2 = require("../models/index");
class UploadController {
    static async showUploadPage(req, res) {
        const user = await index_2.User.findOne({
            where: { id: req.user?.id }
        });
        const uploadedFileName = req.query.file || null;
        res.render('upload', { username: user.username, uploadedFileName, role: user.role });
    }
    static async handleUpload(req, res) {
        const userId = req.user?.id;
        if (!req.file) {
            res.status(400).send('Файл не було завантажено.');
            return;
        }
        const file = req.file;
        await index_1.FileUpload.create({
            fileName: file.originalname,
            userId
        });
        res.redirect(`/upload?file=${encodeURIComponent(file.originalname)}`);
    }
}
exports.UploadController = UploadController;
