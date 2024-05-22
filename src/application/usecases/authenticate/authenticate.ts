
export interface Authenticate {
    generateToken(idUser: string, email: string, password: string): Promise<{ accessToken: string, refreshToken: string }>; 
    verifyToken(accessToken: string): Promise<{isValid: boolean, message?: string}>; 
    generateNewTokenWithRefreshToken(refreshToken: string): Promise<{ accessToken: string, refreshToken: string }>
}