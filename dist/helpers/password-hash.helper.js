"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordHashHelper = void 0;
const crypto_1 = __importDefault(require("crypto"));
class PasswordHashHelper {
    static generateSalt() {
        return crypto_1.default.randomBytes(16).toString('hex');
    }
    static hashPassword(password, salt) {
        return crypto_1.default.pbkdf2Sync(password, salt, this.ITERATIONS, this.KEY_LENGTH, this.DIGEST).toString('hex');
    }
    static verifyPassword(password, salt, hashFromDb) {
        const hashToCheck = this.hashPassword(password, salt);
        return crypto_1.default.timingSafeEqual(Buffer.from(hashFromDb, 'hex'), Buffer.from(hashToCheck, 'hex'));
    }
}
exports.PasswordHashHelper = PasswordHashHelper;
PasswordHashHelper.ITERATIONS = 10000;
PasswordHashHelper.KEY_LENGTH = 64;
PasswordHashHelper.DIGEST = 'sha512';
