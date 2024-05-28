import { Authenticate } from "../../../application/usecases/authenticate/authenticate";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';

dotenv.config();

export type TokenVerificationOutput = {
    isValid: boolean;
    idUser?: string
};

export class AuthenticateJWT implements Authenticate {

    private readonly SECRET_KEY: string;

    private readonly accessTokenOptions = { expiresIn: '1h' };

    private readonly refreshTokenOptions = { expiresIn: '7d' };

    constructor() {
        this.SECRET_KEY = process.env.SECRET_KEY_JWT || '';
        if (!this.SECRET_KEY) {
            throw new Error('JWT secret key not defined!');
        }
    }

    public async generateToken(idUser: string, email: string, password: string): Promise<{ accessToken: string, refreshToken: string, message?: string }> {
        try {
            const sessionId = this.generateSessionId();

            const accessToken = jwt.sign(
                { idUser, email, password, sessionId },
                this.SECRET_KEY,
                this.accessTokenOptions
            );

            const refreshToken = jwt.sign(
                { idUser, email, password, sessionId },
                this.SECRET_KEY,
                this.refreshTokenOptions
            );

            return { accessToken, refreshToken };
        } catch (error: any) {
            return error;
        }
    }

    public async generateNewTokenWithRefreshToken(refreshToken: string): Promise<{ accessToken: string, refreshToken: string, message?: string }> {
        try {
            const decodedRefreshToken = jwt.verify(refreshToken, this.SECRET_KEY) as { idUser: string, email: string, password: string, sessionId: string };
            const { idUser, email, password } = decodedRefreshToken;

            const newSessionId = this.generateSessionId();

            const accessToken = jwt.sign(
                { idUser, email, password, sessionId: newSessionId },
                this.SECRET_KEY,
                this.accessTokenOptions
            );

            const newRefreshToken = jwt.sign(
                { idUser, email, password, sessionId: newSessionId },
                this.SECRET_KEY,
                this.refreshTokenOptions
            );

            return { accessToken, refreshToken: newRefreshToken };
        } catch (error: any) {
            return error;
        }
    }

    public async verifyToken(accessToken: string): Promise<TokenVerificationOutput> {
        try {
            const decodedToken = jwt.verify(accessToken, this.SECRET_KEY) as { idUser: string };
            return {
                isValid: true,
                idUser: decodedToken.idUser
            };
        } catch (error: any) {
            return {
                isValid: false,
                idUser: 'Token is invalid'
            }
        }
    }

    private generateSessionId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}
