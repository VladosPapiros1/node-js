import { Request, Response } from 'express';
import { FileUpload } from '../models/index';
import fs from 'fs';
import path from 'path';


export class ControllerUploadList {
    static async getAllUploads(req: Request, res: Response): Promise<void> {
        const userId = (req as any).user?.id;

        try {
            const logs = await FileUpload.findAll({
                where: { userId },
                order: [['createdAt', 'DESC']],
            });

            res.render('upload-list', { logs });
        } catch (error) {
            console.error('Помилка при завантаженні файлів:', error);
            res.status(500).send('Внутрішня помилка сервера');
        }
    }

    static async deleteOneUpload(req: Request, res: Response): Promise<void> {
    const userId = (req as any).user?.id;
    const fileName = req.params.fileName;

    try {
        const file = await FileUpload.findOne({
            where: { userId, fileName },
        });

        if (!file) {
            res.status(404).send('Файл не знайдено або не належить користувачу');
            return;
        }

        const filePath = path.join(__dirname, '..', 'uploads', file.fileName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        
        await FileUpload.destroy({
            where: { userId, fileName },
        });

        res.redirect('/upload-list');
    } catch (error) {
        console.error('Помилка при видаленні одного файлу:', error);
        res.status(500).send('Не вдалося видалити файл');
    }
}


   static async deleteAllUploads(req: Request, res: Response): Promise<void> {
        const userId = (req as any).user?.id;

        try {

            const files = await FileUpload.findAll({ where: { userId } });


            files.forEach(file => {
                const filePath = path.join(__dirname, '..', 'uploads', file.fileName);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            });


            await FileUpload.destroy({ where: { userId } });

            res.redirect('/upload-list');
        } catch (error) {
            console.error('Помилка при видаленні файлів:', error);
            res.status(500).send('Не вдалося видалити файли');
        }
    }
}