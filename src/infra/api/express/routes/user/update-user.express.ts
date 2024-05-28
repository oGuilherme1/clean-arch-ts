import { Request, Response } from "express";
import { Route, HttpMethod } from "../route";
import { JwtMiddleware } from "../../../../middleware/jwt/middleware.jwt";
import { UpdateUserUseCase, UpdateUserOutput, UpdateUserInput } from "../../../../../application/usecases/user/update-user.usecase";
import { ErrorServeExpress } from "../../error/error-serve.express";


export type ResponseUpdateUser = {
    user: object
}

export class UpdateUserRoute implements Route {

    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateUserService: UpdateUserUseCase,
        private readonly jwtMiddleware: JwtMiddleware,
        private readonly errorServe: ErrorServeExpress
    ) { }

    public static create(updateUserService: UpdateUserUseCase, jwtMiddleware: JwtMiddleware, errorServe: ErrorServeExpress) {
        return new UpdateUserRoute(
            "/user",
            HttpMethod.PUT,
            updateUserService,
            jwtMiddleware,
            errorServe
        );
    }

    public getHandler(): (request: Request, response: Response) => Promise<void> {
        return async (request: Request, response: Response) => {
            await this.jwtMiddleware.middleware(request, response, async () => {
                const idUser = (request as any).idUser;

                const { name, password } = request.body;

                const input: UpdateUserInput = {
                    userId: idUser,
                    name,
                    password
                };

                const output: UpdateUserOutput = await this.updateUserService.execute(input);

                if (output instanceof Error) {
                    return this.errorServe.handler(output, response);
                }

                const responseBody: ResponseUpdateUser = {
                    user: output.updatedUser
                };

                response.status(200).json(responseBody).send();
            });

        };
    }


    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

}
