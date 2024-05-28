import { Request, Response } from "express";
import { Route, HttpMethod } from "../route";
import { JwtMiddleware } from "../../../../middleware/jwt/middleware.jwt";
import { DeleteUserInput, DeleteUserOutput, DeleteUserUseCase } from "../../../../../application/usecases/user/delete-user.usecase";
import { ErrorServeExpress } from "../../error/error-serve.express";


export type ResponseDeleteUser = {
    message: string
}

export class DeleteUserRoute implements Route {

    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteUserService: DeleteUserUseCase,
        private readonly jwtMiddleware: JwtMiddleware,
        private readonly errorServe: ErrorServeExpress
    ) { }

    public static create(deleteUserService: DeleteUserUseCase, jwtMiddleware: JwtMiddleware, errorServe: ErrorServeExpress) {
        return new DeleteUserRoute(
            "/user",
            HttpMethod.DELETE,
            deleteUserService,
            jwtMiddleware,
            errorServe
        );
    }

    public getHandler(): (request: Request, response: Response) => Promise<void> {
        return async (request: Request, response: Response) => {
            await this.jwtMiddleware.middleware(request, response, async () => {
                const idUser = (request as any).idUser;

                const input: DeleteUserInput = {
                    userId: idUser,
                };

                const output: DeleteUserOutput = await this.deleteUserService.execute(input);

                if (output instanceof Error) {
                    return this.errorServe.handler(output, response);
                }

                const responseBody: ResponseDeleteUser = {
                    message: output.message
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
