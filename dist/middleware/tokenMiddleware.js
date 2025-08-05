"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const index_1 = require("../service/index");
class AuthMiddleware {
    static async validToken(req, res, next) {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.redirect('/login');
        }
        const decoded = index_1.JwtService.verifyToken(token);
        if (!decoded) {
            return res.redirect('/login');
        }
        req.user = decoded;
        next();
    }
}
exports.AuthMiddleware = AuthMiddleware;
