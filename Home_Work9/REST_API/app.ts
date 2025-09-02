import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { routerUpload, routerRegister, routerLogin, UploadListRouter, ChatRouter, OperatorRouter } from './routes/index';
import Database from './database/database';
import http from 'http';
import { Server } from 'socket.io';
import { ChatSocket } from './sockets/ClientSocket';

dotenv.config();

export default class App {

    public app: Application;
    private port: number | string;
    private db: Database;

    constructor() {
        this.db = Database.getInstance();
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.setMiddlewares();
        this.setViews();
        this.setRoutes();
    }

    private setMiddlewares(): void {
        this.app.use(cors({
            origin: 'http://localhost:3000',
            credentials: true,
        }));
        this.app.use(cookieParser());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
        this.app.use(express.static(path.join(__dirname, 'public')));
    }

    private setViews(): void {
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, 'views'));
    }

    private setRoutes(): void {
        this.app.use('/register', routerRegister);
        this.app.use('/login', routerLogin);
        this.app.use('/upload', routerUpload);
        this.app.use('/upload-list', UploadListRouter);
        this.app.use('/chat', ChatRouter);
        this.app.use('/operator', OperatorRouter);
        this.app.get('/', (req, res) => {
            res.render('register');
        });
    }

    public async start(): Promise<void> {
        try {
            await this.db.connect();
            await this.db.sync();

            // Створюємо HTTP сервер
            const server = http.createServer(this.app);

            // Підключаємо Socket.IO
            const io = new Server(server, {
                cors: {
                    origin: 'http://localhost:3000',
                    methods: ['GET', 'POST'],
                    credentials: true,
                }
            });

            // Ініціалізуємо логіку Socket.IO
            new ChatSocket(io);

            // Запуск сервера
            server.listen(this.port, () => {
                console.log(`Server is running on port ${this.port}`);
            });
        } catch (error: any) {
            console.error('Помилка при запуску сервера:', error.message);
        }
    }
}
