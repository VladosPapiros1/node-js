"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerRegister = void 0;
const index_1 = require("../models/index");
const index_2 = require("../helpers/index");
const index_3 = require("../service/index");
class ControllerRegister {
    static async register(req, res) {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                res.status(400).json({ message: 'Всі поля обовʼязкові' });
                return;
            }
            const existingUser = await index_1.User.findOne({
                where: { email }
            });
            if (existingUser) {
                res.status(400).json({ message: 'Користувач з таким email вже існує' });
                return;
            }
            const salt = index_2.PasswordHashHelper.generateSalt();
            const passwordHash = index_2.PasswordHashHelper.hashPassword(password, salt);
            const newUser = await index_1.User.create({
                username,
                email,
                passwordhash: passwordHash,
                salt
            });
            const payload = {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            };
            const token = index_3.JwtService.generateToken(payload);
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000 // 24 години
            });
            req.user = username;
            res.status(201).render('upload', { username: username });
        }
        catch (error) {
            res.status(500).json({ message: 'Помилка при збереженні', error });
        }
    }
}
exports.ControllerRegister = ControllerRegister;
