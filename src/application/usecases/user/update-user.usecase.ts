import { User } from "../../../domain/entities/user";
import { UserGateway } from "../../../domain/gateways/user.gateway";
import { UseCase } from "../usecase";

export type UpdateUserInput = {
    userId: string; 
    name: string;
    password: string; 
}

export type UpdateUserOutput = {
    updatedUser: User; 
}


export class UpdateUserUseCase implements UseCase<UpdateUserInput, UpdateUserOutput> {

    private constructor(private readonly userGateway: UserGateway,){}

    public static create(userGateway: UserGateway){
        return new UpdateUserUseCase(userGateway,);
    }

    public async execute({ userId, name, password }: UpdateUserInput): Promise<UpdateUserOutput>{

        const existingUser = await this.userGateway.findById(userId);

        if (!existingUser) {
            throw new Error('User not found');
        }
    
        const updatedUser = User.create({
            name: name,
            email: existingUser.email,
            password: password
        }, existingUser.id)
    
        await this.userGateway.update(updatedUser);

        const output = { updatedUser };

        return  output;

    }

}