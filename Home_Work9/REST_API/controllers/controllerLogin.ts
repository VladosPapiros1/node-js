import { Request, Response } from "express";
import { User } from "../models/index";
import { PasswordHashHelper } from "../helpers/index";
import { JwtService } from "../service/index";

export class ControllerLogin {
    static async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ message: 'Всі поля обовʼязкові' });
                return;
            }

            const user = await User.findOne({
                where: { email }
            });

            if (!user) {
                res.status(401).json({ message: 'Невірний email або пароль' });
                return;
            }

            const isPasswordValid = PasswordHashHelper.verifyPassword(password, user.salt, user.passwordhash);
            if (!isPasswordValid) {
                res.status(401).json({ message: 'Невірний email або пароль' });
                return;
            }

            const payload = {
                id: user.id,
                username: user.username,
                role: user.role
            };

            const token = JwtService.generateToken(payload);

            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000 // 24 години
            });
           (req as any).user = user.username;

            res.status(200).render('upload', { username: user.username, uploadedFileName: null, role: user.role });
        } catch (error) {
            res.status(500).json({ message: 'Помилка при вході', error });
        }

    }
}
