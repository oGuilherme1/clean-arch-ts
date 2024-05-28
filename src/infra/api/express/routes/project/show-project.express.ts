import { Request, Response } from "express";
import { Route, HttpMethod } from "../route";
import { JwtMiddleware } from "../../../../middleware/jwt/middleware.jwt";
import { ShowProjectInput, ShowProjectOutput, ShowProjectUseCase } from "../../../../../application/usecases/project/show-project.usecase";
import { ErrorServeExpress } from "../../error/error-serve.express";


export type ResponseShowProject = {
    project: object;
}

export class ShowProjectRoute implements Route {

    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly showProjectsService: ShowProjectUseCase,
        private readonly jwtMiddleware: JwtMiddleware,
        private readonly errorServe: ErrorServeExpress
    ) { }

    public static create(showProjectsService: ShowProjectUseCase, jwtMiddleware: JwtMiddleware,  errorServe: ErrorServeExpress) {
        return new ShowProjectRoute(
            "/project/:id",
            HttpMethod.GET,
            showProjectsService,
            jwtMiddleware,
            errorServe
        );
    }

    public getHandler(): (request: Request, response: Response) => Promise<void> {
        return async (request: Request, response: Response) => {

            await this.jwtMiddleware.middleware(request, response, async () => {
                const idUser = (request as any).idUser;
                const idProject = request.params.id;

                const input: ShowProjectInput = {
                    projectId: idProject
                };

                const output: ShowProjectOutput = await this.showProjectsService.execute(input);

                if(output instanceof Error){
                    return this.errorServe.handler(output, response);
                }

                const responseBody: ResponseShowProject = {
                    project: output.project
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
