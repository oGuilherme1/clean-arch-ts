import { Request, Response } from "express";
import { Route, HttpMethod } from "../route";
import { JwtMiddleware } from "../../../../middleware/jwt/middleware.jwt";
import { CreateProjectInput, CreateProjectOutput, CreateProjectUseCase } from "../../../../../application/usecases/project/create-project.usecase";
import { ErrorServeExpress } from "../../error/error-serve.express";


export type ResponseCreateProject = {
    project: object;
}

export class CreateProjectRoute implements Route {

    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createProjectsService: CreateProjectUseCase,
        private readonly jwtMiddleware: JwtMiddleware,
        private readonly errorServe: ErrorServeExpress
    ) { }

    public static create(createProjectsService: CreateProjectUseCase, jwtMiddleware: JwtMiddleware,  errorServe: ErrorServeExpress) {
        return new CreateProjectRoute(
            "/project",
            HttpMethod.POST,
            createProjectsService,
            jwtMiddleware,
            errorServe
        );
    }

    public getHandler(): (request: Request, response: Response) => Promise<void> {
        return async (request: Request, response: Response) => {

            await this.jwtMiddleware.middleware(request, response, async () => {
                const idUser = (request as any).idUser;
                const { name, description, startDate, expectedEndDate } = request.body;

                const input: CreateProjectInput = {
                    userId: idUser,
                    name: name,
                    description: description,
                    startDate: startDate,
                    expectedEndDate: expectedEndDate
                };

                const output: CreateProjectOutput = await this.createProjectsService.execute(input);
                
                if(output instanceof Error){
                    return this.errorServe.handler(output, response);
                }

                const responseBody: ResponseCreateProject = {
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
