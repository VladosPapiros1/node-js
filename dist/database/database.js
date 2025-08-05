"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("../models");
dotenv_1.default.config();
class Database {
    constructor() {
        const dbName = process.env.DB_NAME;
        const dbUser = process.env.DB_USER;
        const dbPass = process.env.DB_PASSWORD;
        const dbHost = process.env.DB_HOST;
        this.sequelize = new sequelize_typescript_1.Sequelize(dbName, dbUser, dbPass, {
            host: dbHost,
            dialect: 'mysql',
            models: [models_1.User, models_1.FileUpload],
            logging: console.log,
        });
    }
    async connect() {
        try {
            await this.sequelize.authenticate();
            console.log('Database connection has been established successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
    async sync() {
        try {
            await this.sequelize.sync({ alter: true });
            console.log('Database synchronized');
        }
        catch (error) {
            console.error('DB sync error:', error);
        }
    }
    getSequelize() {
        return this.sequelize;
    }
}
exports.default = Database;
