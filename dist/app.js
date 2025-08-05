"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_1 = require("./routes/index");
const database_1 = __importDefault(require("./database/database"));
dotenv_1.default.config();
class App {
    constructor() {
        this.db = new database_1.default();
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 3000;
        this.setMiddlewares();
        this.setViews();
        this.setRoutes();
    }
    setMiddlewares() {
        this.app.use((0, cors_1.default)({
            origin: 'http://localhost:3000',
            credentials: true,
        }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
    }
    setViews() {
        this.app.set('view engine', 'ejs');
        this.app.set('views', path_1.default.join(__dirname, 'views'));
    }
    setRoutes() {
        this.app.use('/register', index_1.routerRegister);
        this.app.use('/login', index_1.routerLogin);
        this.app.use('/upload', index_1.routerUpload);
        this.app.use('/upload-list', index_1.UploadListRouter);
        this.app.get('/', (req, res) => {
            res.render('register');
        });
    }
    async start() {
        try {
            await this.db.connect();
            await this.db.sync();
            this.app.listen(this.port, () => {
                console.log(`Server is running on port ${this.port}`);
            });
        }
        catch (error) {
            console.error('Помилка при запуску сервера:', error.message);
        }
    }
}
exports.default = App;
