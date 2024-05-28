import { CreateProjectUseCase } from "../../../application/usecases/project/create-project.usecase";
import { DeleteProjectUseCase } from "../../../application/usecases/project/delete-project.usecase";
import { IndexProjectsUseCase } from "../../../application/usecases/project/index.project.usecase";
import { MockProjectGateway } from "../../../application/usecases/project/mock-project.gateway";
import { ShowProjectUseCase } from "../../../application/usecases/project/show-project.usecase";
import { UpdateProjectUseCase } from "../../../application/usecases/project/update-project.usecase";
import { ErrorServeExpress } from "../../api/express/error/error-serve.express";
import { CreateProjectRoute } from "../../api/express/routes/project/create-project.express";
import { DeleteProjectRoute } from "../../api/express/routes/project/delete-project.express";
import { IndexProjectsRoute } from "../../api/express/routes/project/index-project.express";
import { ShowProjectRoute } from "../../api/express/routes/project/show-project.express";
import { UpdateProjectRoute } from "../../api/express/routes/project/update-project.express";
import { AuthenticateJWT } from "../../authenticate/jwt/authenticate.jwt";

import { JwtMiddleware } from "../../middleware/jwt/middleware.jwt";

export class ProjectFlowFactory {

    static create(repository: MockProjectGateway, authenticateJWT: AuthenticateJWT, jwtMiddleware: JwtMiddleware, errorServe: ErrorServeExpress): any {

        const indexProjectUseCase = IndexProjectsUseCase.create(repository);
        const indexProjectrRoute = IndexProjectsRoute.create(indexProjectUseCase, jwtMiddleware, errorServe);

        const showProjectUseCase = ShowProjectUseCase.create(repository);
        const showProjectrRoute = ShowProjectRoute.create(showProjectUseCase, jwtMiddleware, errorServe);

        const createProjectUseCase = CreateProjectUseCase.create(repository);
        const createProjectrRoute = CreateProjectRoute.create(createProjectUseCase, jwtMiddleware, errorServe);

        const updateProjectUseCase = UpdateProjectUseCase.create(repository);
        const updateProjectrRoute = UpdateProjectRoute.create(updateProjectUseCase, jwtMiddleware, errorServe);

        const deleteProjectUseCase = DeleteProjectUseCase.create(repository);
        const deleteProjectrRoute = DeleteProjectRoute.create(deleteProjectUseCase, jwtMiddleware, errorServe);

        return [
            indexProjectrRoute,
            showProjectrRoute,
            createProjectrRoute,
            updateProjectrRoute,
            deleteProjectrRoute
            // Adicione outras rotas relacionadas ao usuário, se necessário
        ];
    }
}