"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const index_1 = require("../models/index");
class UploadController {
    static async showUploadPage(req, res) {
        const username = req.user?.username || 'Гість';
        const uploadedFileName = req.query.file || null;
        res.render('upload', { username, uploadedFileName });
    }
    static async handleUpload(req, res) {
        if (!req.file) {
            res.status(400).send('Файл не було завантажено.');
            return;
        }
        const userId = req.user?.id;
        const filename = req.file.filename;
        await index_1.FileUpload.create({ fileName: filename, userId });
        res.redirect(`/upload?file=${encodeURIComponent(filename)}`);
    }
}
exports.UploadController = UploadController;
