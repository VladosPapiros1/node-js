import { Request, Response } from "express";
import { User } from "../models/index";
import { PasswordHashHelper } from "../helpers/index";
import { JwtService } from "../service/index";


export class ControllerRegister {
    static async register(req: Request, res: Response): Promise<void> {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password) {
                res.status(400).json({ message: 'Всі поля обовʼязкові' });
                return;
            }

            const existingUser = await User.findOne({
                where: { email }
            });
            if (existingUser) {
                res.status(400).json({ message: 'Користувач з таким email вже існує' });
                return;
            }

            const salt = PasswordHashHelper.generateSalt();
            const passwordHash = PasswordHashHelper.hashPassword(password, salt);

            const newUser = await User.create({
                username,
                email,
                passwordhash: passwordHash,
                salt,
                role: 'user'// Default role
            });
 
            const payload = {
                id: newUser.id,
                username: newUser.username,
                role: newUser.role
            };

            const token = JwtService.generateToken(payload);

            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000 // 24 години
            });

            (req as any).user = username;

            res.status(201).render('upload', { username: username, uploadedFileName: null, role: newUser.role  });

        } catch (error) {
            res.status(500).json({ message: 'Помилка при збереженні', error });
        }

    }

}
