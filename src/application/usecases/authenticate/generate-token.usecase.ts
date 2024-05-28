import { UseCase } from "../usecase";
import { Authenticate } from "./authenticate";

export type GenerateTokenInput = {
    idUser: string;
    email: string;
    password: string;
}

export type GenerateTokenOutput = {
    access_token: string;
    refresh_token: string
}

export class GenerateTokenUsecase implements UseCase<GenerateTokenInput, GenerateTokenOutput> {

    private constructor(private readonly authenticate: Authenticate) { }

    public static create(authenticate: Authenticate) {
        return new GenerateTokenUsecase(authenticate);
    }

    public async execute({ idUser, email, password }: GenerateTokenInput): Promise<GenerateTokenOutput> {

        try {
            const token = await this.authenticate.generateToken(idUser, email, password);

            if (!token) {
                throw new Error('Incorrect email or password');
            }

            const output: GenerateTokenOutput = {
                access_token: token.accessToken,
                refresh_token: token.refreshToken
            };

            return output;

        } catch (error: any) {
            return error;
        }
    }
}
