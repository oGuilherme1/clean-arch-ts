import { Request, Response } from "express";
import { Route, HttpMethod } from "../route";
import { CreateUserInput, CreateUserOutput, CreateUserUseCase } from "../../../../../application/usecases/user/create-user.usecase";
import { ErrorServeExpress } from "../../error/error-serve.express";


export class CreateUserRoute implements Route {

    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createUserService: CreateUserUseCase,
        private readonly errorServe: ErrorServeExpress
    ) { }

    public static create(createUserService: CreateUserUseCase, errorServe: ErrorServeExpress) {
        return new CreateUserRoute(
            "/user",
            HttpMethod.POST,
            createUserService,
            errorServe
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {

            const { name, email, password } = request.body;

            const input: CreateUserInput = {
                name,
                email,
                password
            };

            const output: CreateUserOutput = await this.createUserService.execute(input);

            if (output instanceof Error) {
                return this.errorServe.handler(output, response);
            }

            const responseBody: CreateUserOutput = {
                id: output.id,
                access_token: output.access_token,
                refresh_token: output.refresh_token
            };

            response.status(200).json(responseBody).send();
        };
    }


    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

}
