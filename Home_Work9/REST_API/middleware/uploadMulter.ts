
import multer from 'multer';
import path from 'path';

const uploadPath = path.join(__dirname, '..', 'uploads');
export class UploadMulter {
    static getMulterInstance() {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, uploadPath);
            },
            filename: (req, file, cb) => {
                const timestamp = Date.now();
                const ext = path.extname(file.originalname);
                const base = path.basename(file.originalname, ext);
                cb(null, `${base}-${timestamp}${ext}`);
            }
        });

        const upload = multer({ storage });
        return upload;
    }
}

