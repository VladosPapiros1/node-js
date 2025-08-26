"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadMulter = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uploadPath = path_1.default.join(__dirname, '..', 'uploads');
class UploadMulter {
    static getMulterInstance() {
        const storage = multer_1.default.diskStorage({
            destination: (req, file, cb) => {
                cb(null, uploadPath);
            },
            filename: (req, file, cb) => {
                const timestamp = Date.now();
                const ext = path_1.default.extname(file.originalname);
                const base = path_1.default.basename(file.originalname, ext);
                cb(null, `${base}-${timestamp}${ext}`);
            }
        });
        const upload = (0, multer_1.default)({ storage });
        return upload;
    }
}
exports.UploadMulter = UploadMulter;
