import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../service/index';

export class AuthMiddleware {
    static async validToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.redirect('/login');
        }

        const decoded = JwtService.verifyToken(token);
        if (!decoded) {
            return res.redirect('/login');
        }
       (req as any).user = decoded;
        
        next();
    }
}