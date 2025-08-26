import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';
import { User, FileUpload } from '../models';

dotenv.config();

class Database {
    private sequelize: Sequelize;

    constructor() {
        const dbName = process.env.DB_NAME!;
        const dbUser = process.env.DB_USER!;
        const dbPass = process.env.DB_PASSWORD!;
        const dbHost = process.env.DB_HOST!;

        this.sequelize = new Sequelize(dbName, dbUser, dbPass, {
            host: dbHost,
            dialect: 'mysql',
            models: [User, FileUpload],
            logging: console.log,
        });
    }

    public async connect(): Promise<void> {
        try {
            await this.sequelize.authenticate();
            console.log('Database connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
    public async sync(): Promise<void> {
        try {
            await this.sequelize.sync({ alter: true });
            console.log('Database synchronized');
        } catch (error) {
            console.error('DB sync error:', error);
        }
    }

    public getSequelize(): Sequelize {
        return this.sequelize;
    }
}

export default Database;
