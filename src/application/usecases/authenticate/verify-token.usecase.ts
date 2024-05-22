import { UseCase } from "../usecase";
import { Authenticate } from "./authenticate";

export type VerifyTokenInput = {
    token: string
}

export type VerifyTokenOutput = {
    isValid: boolean;
    userId?: string;
    expiresIn?: number;
}

export class VerifyTokenUsecase implements UseCase<VerifyTokenInput, VerifyTokenOutput> {

    private constructor(private readonly authenticate: Authenticate){}

    public static create(authenticate: Authenticate){
        return new VerifyTokenUsecase(authenticate);
    }

    public async execute({token}: VerifyTokenInput): Promise<VerifyTokenOutput> {
        return await this.authenticate.verifyToken(token);
    }
    
}