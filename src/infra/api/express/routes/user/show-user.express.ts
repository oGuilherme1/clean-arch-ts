import { Request, Response } from "express";
import { Route, HttpMethod } from "../route";
import { JwtMiddleware } from "../../../../middleware/jwt/middleware.jwt";
import { ShowUserInput, ShowUserOutput, ShowUserUseCase } from "../../../../../application/usecases/user/show-user.usecase";
import { ErrorServeExpress } from "../../error/error-serve.express";


export type ResponseShowUser = {
    user: object
}

export class ShowUserRoute implements Route {

    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly showUserService: ShowUserUseCase,
        private readonly jwtMiddleware: JwtMiddleware,
        private readonly errorServe: ErrorServeExpress
    ) { }

    public static create(showUserService: ShowUserUseCase, jwtMiddleware: JwtMiddleware, errorServe: ErrorServeExpress) {
        return new ShowUserRoute(
            "/user",
            HttpMethod.GET,
            showUserService,
            jwtMiddleware,
            errorServe
        );
    }

    public getHandler(): (request: Request, response: Response) => Promise<void> {
        return async (request: Request, response: Response) => {

            await this.jwtMiddleware.middleware(request, response, async () => {
                const idUser = (request as any).idUser;

                const input: ShowUserInput = {
                    userId: idUser,
                };

                const output: ShowUserOutput = await this.showUserService.execute(input);

                if (output instanceof Error) {
                    return this.errorServe.handler(output, response);
                }

                const responseBody: ResponseShowUser = {
                    user: output.showdUser
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
