import { User } from "../../../domain/entities/user";
import { UserGateway } from "../../../domain/gateways/user.gateway";
import { UseCase } from "../usecase";

export type ShowUserInput = {
    userId: string
}

export type ShowUserOutput = {
    showdUser: User; 
}


export class ShowUserUseCase implements UseCase<ShowUserInput, ShowUserOutput> {

    private constructor(private readonly userGateway: UserGateway,){}

    public static create(userGateway: UserGateway){
        return new ShowUserUseCase(userGateway,);
    }

    public async execute({ userId }: ShowUserInput): Promise<ShowUserOutput>{

        try{
            const user = await this.userGateway.show(userId);

            if (!user) {
                throw new Error('User not found');
            }
    
            return { showdUser: user };
            
        }catch(error: any) {
            return error;
        }


    }

}