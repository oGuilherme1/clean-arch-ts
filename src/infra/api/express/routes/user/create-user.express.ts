import { Request, Response } from "express";
import { Route, HttpMethod } from "../route";
import { CreateUserInput, CreateUserOutput, CreateUserUseCase } from "../../../../../application/usecases/user/create-user.usecase";


export class CreateUserRoute implements Route {

    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createUserService: CreateUserUseCase
    ) { }

    public static create(createUserService: CreateUserUseCase) {
        return new CreateUserRoute(
            "/user",
            HttpMethod.POST,
            createUserService
        );
    }

    public getHandler(){
        return async (request: Request, response: Response) => {
            try {
                const { name, email, password } = request.body;

                const input: CreateUserInput = {
                    name,
                    email,
                    password
                };

                const output: CreateUserOutput = await this.createUserService.execute(input);

                const responseBody: CreateUserOutput = {
                    id: output.id,
                    access_token: output.access_token,
                    refresh_token: output.refresh_token
                };

                response.status(200).json(responseBody).send();

            } catch (error: any) {
                response.status(401).json({ message: error.message});
            }
        };
    }


    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

}
