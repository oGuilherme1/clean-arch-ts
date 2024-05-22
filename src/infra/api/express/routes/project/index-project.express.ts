import { NextFunction, Request, Response } from "express";
import { IndexProjectsUseCase, IndexProjectInput, IndexProjectsOutput } from "../../../../../application/usecases/project/index.project.usecase";
import { Route, HttpMethod } from "../route";
import { JwtMiddleware } from "../../../../middleware/jwt/middleware.jwt";


export type IndexProjectsResponseDto = {
    projects: ProjectDto[];
}

export type ProjectDto = {
    id: string;
}

export class IndexProjectsRoute implements Route {

    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly indexProjectsService: IndexProjectsUseCase,
        private readonly jwtMiddleware: JwtMiddleware
    ){}

    public static create(indexProjectsService: IndexProjectsUseCase, jwtMiddleware: JwtMiddleware){
        return new IndexProjectsRoute(
            "/projects",
            HttpMethod.GET,
            indexProjectsService,
            jwtMiddleware 
        );
    }

    public getHandler(): (request: Request, response: Response) => Promise<void> {
        return async (request: Request, response: Response) => {
            try {
                await this.jwtMiddleware.middleware(request, response, async () => {
                    const idUser = (request as any).idUser; 
    
                    const input: IndexProjectInput = {
                        userId: idUser,
                    };
    
                    const output: IndexProjectsOutput = await this.indexProjectsService.execute(input);
    
                    const responseBody: IndexProjectsResponseDto = {
                        projects: output.projects.map(project => ({
                            id: project.id,
                        })),
                    };
    
                    response.status(200).json(responseBody);
                });
            } catch (error: any) {
                response.status(401).json({ message: error.message});
            }
        };
    }


    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod{
        return this.method;
    }

    private present(input: IndexProjectsOutput): IndexProjectsResponseDto {
        const projects = input.projects.map(project => ({
            id: project.id,
            // Mapear outras propriedades do projeto, se necessário
        }));
        return { projects };
    }
}
