import { NextFunction, Request, Response } from "express";
import { AuthenticateJWT } from '../../authenticate/jwt/authenticate.jwt';

export class JwtMiddleware {
    
    constructor(private authenticateJWT: AuthenticateJWT) {}

    public middleware = async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        try {
            const verificationResult = await this.authenticateJWT.verifyToken(token);

            if (!verificationResult.isValid || !verificationResult.idUser) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            (req as any).idUser = verificationResult.idUser;

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    };
}

