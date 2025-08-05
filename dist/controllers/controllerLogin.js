"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerLogin = void 0;
const index_1 = require("../models/index");
const index_2 = require("../helpers/index");
const index_3 = require("../service/index");
class ControllerLogin {
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ message: 'Всі поля обовʼязкові' });
                return;
            }
            const user = await index_1.User.findOne({
                where: { email }
            });
            if (!user) {
                res.status(401).json({ message: 'Невірний email або пароль' });
                return;
            }
            const isPasswordValid = index_2.PasswordHashHelper.verifyPassword(password, user.salt, user.passwordhash);
            if (!isPasswordValid) {
                res.status(401).json({ message: 'Невірний email або пароль' });
                return;
            }
            const payload = {
                id: user.id,
                email: user.email,
                username: user.username
            };
            const token = index_3.JwtService.generateToken(payload);
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000 // 24 години
            });
            req.user = user.username;
            res.status(200).render('upload', { username: user.username, uploadedFileName: null });
        }
        catch (error) {
            res.status(500).json({ message: 'Помилка при вході', error });
        }
    }
}
exports.ControllerLogin = ControllerLogin;
