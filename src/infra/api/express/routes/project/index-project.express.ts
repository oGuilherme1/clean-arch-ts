import { Request, Response } from "express";
import { IndexProjectsUseCase, IndexProjectInput, IndexProjectsOutput } from "../../../../../application/usecases/project/index.project.usecase";
import { Route, HttpMethod } from "../route";
import { JwtMiddleware } from "../../../../middleware/jwt/middleware.jwt";
import { ErrorServeExpress } from "../../error/error-serve.express";


export type ResponseIndexProject = {
    projects: object[];
}

export class IndexProjectsRoute implements Route {

    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly indexProjectsService: IndexProjectsUseCase,
        private readonly jwtMiddleware: JwtMiddleware,
        private readonly errorServe: ErrorServeExpress
    ) { }

    public static create(indexProjectsService: IndexProjectsUseCase, jwtMiddleware: JwtMiddleware, errorServe: ErrorServeExpress) {
        return new IndexProjectsRoute(
            "/project",
            HttpMethod.GET,
            indexProjectsService,
            jwtMiddleware,
            errorServe
        );
    }

    public getHandler(): (request: Request, response: Response) => Promise<void> {
        return async (request: Request, response: Response) => {

            await this.jwtMiddleware.middleware(request, response, async () => {
                const idUser = (request as any).idUser;

                const input: IndexProjectInput = {
                    userId: idUser,
                };

                const output: IndexProjectsOutput = await this.indexProjectsService.execute(input);

                if(output instanceof Error){
                    return this.errorServe.handler(output, response);
                }

                const responseBody: ResponseIndexProject = {
                    projects: output.projects,
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
