import { UserGateway } from "../../../domain/gateways/user.gateway";
import { UseCase } from "../usecase";

export type DeleteUserInput = {
    userId: string;
}

export type DeleteUserOutput = {
    message: string;
}


export class DeleteUserUseCase implements UseCase<DeleteUserInput, DeleteUserOutput> {

    private constructor(private readonly userGateway: UserGateway,) { }

    public static create(userGateway: UserGateway) {
        return new DeleteUserUseCase(userGateway,);
    }

    public async execute({ userId }: DeleteUserInput): Promise<DeleteUserOutput> {

        try {
            const existingUser = await this.userGateway.findById(userId);

            if (!existingUser) {
                throw new Error("User not found");
            }

            await this.userGateway.destroy(userId);

            const output = {
                message: "User deleted"
            }

            return output;

        } catch (error: any) {
            return error;
        }

    }

}