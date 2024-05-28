import { Request, Response } from "express";
import { Route, HttpMethod } from "../route";
import { JwtMiddleware } from "../../../../middleware/jwt/middleware.jwt";
import { DeleteProjectInput, DeleteProjectOutput, DeleteProjectUseCase } from "../../../../../application/usecases/project/delete-project.usecase";
import { ErrorServeExpress } from "../../error/error-serve.express";


export type ResponseDeleteProject = {
    message: string;
}

export class DeleteProjectRoute implements Route {

    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteProjectsService: DeleteProjectUseCase,
        private readonly jwtMiddleware: JwtMiddleware,
        private readonly errorServe: ErrorServeExpress
    ) { }

    public static create(deleteProjectsService: DeleteProjectUseCase, jwtMiddleware: JwtMiddleware, errorServe: ErrorServeExpress) {
        return new DeleteProjectRoute(
            "/project/:id",
            HttpMethod.DELETE,
            deleteProjectsService,
            jwtMiddleware,
            errorServe
        );
    }

    public getHandler(): (request: Request, response: Response) => Promise<void> {
        return async (request: Request, response: Response) => {

            await this.jwtMiddleware.middleware(request, response, async () => {
                const idUser = (request as any).idUser;
                const idProject = request.params.id;

                const input: DeleteProjectInput = {
                    projectId: idProject
                };

                const output: DeleteProjectOutput = await this.deleteProjectsService.execute(input);

                if(output instanceof Error){
                    return this.errorServe.handler(output, response);
                }

                const responseBody: ResponseDeleteProject = {
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
