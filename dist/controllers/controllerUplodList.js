"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerUploadList = void 0;
const index_1 = require("../models/index");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class ControllerUploadList {
    static async getAllUploads(req, res) {
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
    }
    static async deleteOneUpload(req, res) {
        const userId = req.user?.id;
        const fileName = req.params.fileName;
        try {
            const file = await index_1.FileUpload.findOne({
                where: { userId, fileName },
            });
            if (!file) {
                res.status(404).send('Файл не знайдено або не належить користувачу');
                return;
            }
            const filePath = path_1.default.join(__dirname, '..', 'uploads', file.fileName);
            if (fs_1.default.existsSync(filePath)) {
                fs_1.default.unlinkSync(filePath);
            }
            await index_1.FileUpload.destroy({
                where: { userId, fileName },
            });
            res.redirect('/upload-list');
        }
        catch (error) {
            console.error('Помилка при видаленні одного файлу:', error);
            res.status(500).send('Не вдалося видалити файл');
        }
    }
    static async deleteAllUploads(req, res) {
        const userId = req.user?.id;
        try {
            const files = await index_1.FileUpload.findAll({ where: { userId } });
            files.forEach(file => {
                const filePath = path_1.default.join(__dirname, '..', 'uploads', file.fileName);
                if (fs_1.default.existsSync(filePath)) {
                    fs_1.default.unlinkSync(filePath);
                }
            });
            await index_1.FileUpload.destroy({ where: { userId } });
            res.redirect('/upload-list');
        }
        catch (error) {
            console.error('Помилка при видаленні файлів:', error);
            res.status(500).send('Не вдалося видалити файли');
        }
    }
}
exports.ControllerUploadList = ControllerUploadList;
