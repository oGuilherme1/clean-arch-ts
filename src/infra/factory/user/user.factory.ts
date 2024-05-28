import { ShowProjectUseCase } from "../../../application/usecases/project/show-project.usecase";
import { CreateUserUseCase } from "../../../application/usecases/user/create-user.usecase";
import { DeleteUserUseCase } from "../../../application/usecases/user/delete-user.usecase";
import { MockUserGateway } from "../../../application/usecases/user/mock-user-gateway";
import { ShowUserUseCase } from "../../../application/usecases/user/show-user.usecase";
import { UpdateUserUseCase } from "../../../application/usecases/user/update-user.usecase";
import { ErrorServeExpress } from "../../api/express/error/error-serve.express";
import { CreateUserRoute } from "../../api/express/routes/user/create-user.express";
import { DeleteUserRoute } from "../../api/express/routes/user/delete-user.express";
import { ShowUserRoute } from "../../api/express/routes/user/show-user.express";
import { UpdateUserRoute } from "../../api/express/routes/user/update-user.express";
import { AuthenticateJWT } from "../../authenticate/jwt/authenticate.jwt";
import { JwtMiddleware } from "../../middleware/jwt/middleware.jwt";

export class UserFlowFactory {
    static create(repository: MockUserGateway, authenticateJWT: AuthenticateJWT, jwtMiddleware: JwtMiddleware, errorServe: ErrorServeExpress): any {
        
        const createUserUseCase = CreateUserUseCase.create(repository, authenticateJWT);
        const createUserRoute = CreateUserRoute.create(createUserUseCase, errorServe);

        const updateUserUseCase = UpdateUserUseCase.create(repository);
        const updateUserRoute = UpdateUserRoute.create(updateUserUseCase, jwtMiddleware, errorServe);

        const deleteUserUseCase = DeleteUserUseCase.create(repository);
        const deleteUserRoute = DeleteUserRoute.create(deleteUserUseCase, jwtMiddleware, errorServe);

        const showUserUseCase = ShowUserUseCase.create(repository);
        const showUserRoute = ShowUserRoute.create(showUserUseCase, jwtMiddleware, errorServe);

        return [
            createUserRoute,
            updateUserRoute,
            deleteUserRoute,
            showUserRoute
        ];
    }
}
