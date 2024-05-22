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

            if (token) {
                const output: GenerateTokenOutput = {
                    access_token: token.accessToken,
                    refresh_token: token.refreshToken
                };

                return output;
            } else {
                throw new Error('Incorrect email or password');
            }
        } catch (error: any) {
            throw new Error('Error generating token: ' + error.message);
        }
    }
}
