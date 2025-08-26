import crypto from 'crypto';

export class PasswordHashHelper {
    static ITERATIONS = 10000;
    static KEY_LENGTH = 64;
    static DIGEST = 'sha512';

    static generateSalt(): string {
        return crypto.randomBytes(16).toString('hex');
    }

    static hashPassword(password: string, salt: string): string {
        return crypto.pbkdf2Sync(password, salt, this.ITERATIONS, this.KEY_LENGTH, this.DIGEST).toString('hex');
    }

    static verifyPassword(password: string, salt: string, hashFromDb: string): boolean {
        const hashToCheck = this.hashPassword(password, salt);
        return crypto.timingSafeEqual(
            Buffer.from(hashFromDb, 'hex'),
            Buffer.from(hashToCheck, 'hex'),
        );
    }
}
