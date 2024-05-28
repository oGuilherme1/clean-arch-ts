import { UseCase } from "../usecase";
import { Authenticate } from "./authenticate";

export type RefreshTokenInput = {
    refresh_token: string
}

export type RefreshTokenOutput = {
    access_token: string;
    refresh_token: string
}


export class RefreshTokenUsecase implements UseCase<RefreshTokenInput, RefreshTokenOutput> {

    private constructor(private readonly authenticate: Authenticate) { }

    public static create(authenticate: Authenticate) {
        return new RefreshTokenUsecase(authenticate);
    }

    public async execute({ refresh_token }: RefreshTokenInput): Promise<RefreshTokenOutput> {

        try {
            const token = await this.authenticate.generateNewTokenWithRefreshToken(refresh_token);

            if (!token) {
                throw new Error('Invalid refresh token.');
            }

            const output: RefreshTokenOutput = {
                access_token: token.accessToken,
                refresh_token: token.refreshToken

            };
            return output;

        } catch (error: any) {
            return error;
        }
    }
}