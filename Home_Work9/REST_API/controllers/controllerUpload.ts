// controllers/UploadController.ts
import { Request, Response } from 'express';
import { FileUpload } from '../models/index';
import { User } from "../models/index";

export class UploadController {
    static async showUploadPage(req: Request, res: Response): Promise<void> {
        const user = await User.findOne({
            where: { id: (req as any).user?.id }
        });
        const uploadedFileName = req.query.file || null;
        res.render('upload', { username: user!.username, uploadedFileName, role: user!.role  });
    }

    static async handleUpload(req: Request, res: Response): Promise<void> {
        const userId = (req as any).user?.id;

        if (!req.file) {
            res.status(400).send('Файл не було завантажено.');
            return;
        }

        const file = req.file;

        await FileUpload.create({
            fileName: file.originalname,
            userId
        } as any);

        res.redirect(`/upload?file=${encodeURIComponent(file.originalname)}`);
    }
}

