import { Request, Response } from "express";
import { Route, HttpMethod } from "../route";
import { JwtMiddleware } from "../../../../middleware/jwt/middleware.jwt";
import { UpdateProjectInput, UpdateProjectOutput, UpdateProjectUseCase } from "../../../../../application/usecases/project/update-project.usecase";
import { ErrorServeExpress } from "../../error/error-serve.express";


export type ResponseUpdateProject = {
    project: object;
}

export class UpdateProjectRoute implements Route {

    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateProjectsService: UpdateProjectUseCase,
        private readonly jwtMiddleware: JwtMiddleware,
        private readonly errorServe: ErrorServeExpress
    ) { }

    public static create(updateProjectsService: UpdateProjectUseCase, jwtMiddleware: JwtMiddleware, errorServe: ErrorServeExpress) {
        return new UpdateProjectRoute(
            "/project",
            HttpMethod.PUT,
            updateProjectsService,
            jwtMiddleware,
            errorServe
        );
    }

    public getHandler(): (request: Request, response: Response) => Promise<void> {
        return async (request: Request, response: Response) => {

            await this.jwtMiddleware.middleware(request, response, async () => {
                const idUser = (request as any).idUser;
                const { projectId, description } = request.body;

                const input: UpdateProjectInput = {
                    projectId: projectId,
                    description: description
                };

                const output: UpdateProjectOutput = await this.updateProjectsService.execute(input);

                if(output instanceof Error){
                   return this.errorServe.handler(output, response);
                }

                const responseBody: ResponseUpdateProject = {
                    project: output.updatedProject
                };

                response.status(200).json(responseBody);
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
