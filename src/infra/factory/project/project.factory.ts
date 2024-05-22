import { IndexProjectsUseCase } from "../../../application/usecases/project/index.project.usecase";
import { MockProjectGateway } from "../../../application/usecases/project/mock-project.gateway";
import { IndexProjectsRoute } from "../../api/express/routes/project/index-project.express";
import { AuthenticateJWT } from "../../authenticate/jwt/authenticate.jwt";
import { JwtMiddleware } from "../../middleware/jwt/middleware.jwt";

export class ProjectFlowFactory {
    static create(mockUserGateway: MockProjectGateway, authenticateJWT: AuthenticateJWT, jwtMiddleware: JwtMiddleware): any {
        const indexProjectUseCase = IndexProjectsUseCase.create(mockUserGateway);
        const indexProjectrRoute = IndexProjectsRoute.create(indexProjectUseCase, jwtMiddleware);
        return [
            indexProjectrRoute,
            // Adicione outras rotas relacionadas ao usuário, se necessário
        ];
    }
}