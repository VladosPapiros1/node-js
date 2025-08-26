import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class JwtService {
    static secretKey: Secret = process.env.JWT_SECRET_VALUE || 'defaultSecretKey';
    static expiresIn: string = process.env.JWT_EXPIRES_IN || '1h';


    static generateToken(payload: object): string {
        return jwt.sign(payload, this.secretKey, { expiresIn : Number(this.expiresIn)  });
    }

    static verifyToken(token: string): object | null {
        try {
            return jwt.verify(token, this.secretKey) as object;
        } catch (error) {
            console.error('Token verification failed:', error);
            return null;
        }
    }
}