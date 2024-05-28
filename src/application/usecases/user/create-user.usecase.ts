import { User } from "../../../domain/entities/user";
import { UserGateway } from "../../../domain/gateways/user.gateway";
import { Authenticate } from "../authenticate/authenticate";
import { GenerateTokenInput, GenerateTokenOutput, GenerateTokenUsecase } from "../authenticate/generate-token.usecase";
import { UseCase } from "../usecase";

export type CreateUserInput = {
    name: string;
    email: string;
    password: string; 
}

export type CreateUserOutput = {
    id: string;
    access_token: string;
    refresh_token: string
}

export class CreateUserUseCase implements UseCase<CreateUserInput, CreateUserOutput> {

    private constructor(
        private readonly userGateway: UserGateway,
        private readonly authenticate: Authenticate
    ){}

    public static create(userGateway: UserGateway, authenticate: Authenticate){
        return new CreateUserUseCase(userGateway, authenticate);
    }

    public async execute({name, email, password}: CreateUserInput): Promise<CreateUserOutput> {
        
        try {
            const existingUser = await this.userGateway.findUserByEmail(email);
        
            if (existingUser) {
                throw new Error('User already exists with this email.');
            }
    
            const aUser = User.create({
                name, 
                email, 
                password
            })
            
            await this.userGateway.store(aUser);

            const generateTokenInput: GenerateTokenInput = {
                idUser: aUser.id,
                email,
                password
            }
    
            const generateTokenUsecase = GenerateTokenUsecase.create(this.authenticate);
    
            const generateTokenOutput: GenerateTokenOutput = await generateTokenUsecase.execute(generateTokenInput);
    
            const output = this.presentOutput(aUser, generateTokenOutput.access_token, generateTokenOutput.refresh_token)
    
            return output;
        } 
        catch (error: any) {
            return error;
        }

    }

    private presentOutput(user: User, access_token: string, refresh_token: string ): CreateUserOutput {
        return {
            id: user.id,
            access_token,
            refresh_token
        };
    }

}
