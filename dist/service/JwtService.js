"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class JwtService {
    static generateToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.secretKey, { expiresIn: Number(this.expiresIn) });
    }
    static verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.secretKey);
        }
        catch (error) {
            console.error('Token verification failed:', error);
            return null;
        }
    }
}
exports.JwtService = JwtService;
JwtService.secretKey = process.env.JWT_SECRET_VALUE || 'defaultSecretKey';
JwtService.expiresIn = process.env.JWT_EXPIRES_IN || '1h';
