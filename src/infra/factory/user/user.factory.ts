import { CreateUserUseCase } from "../../../application/usecases/user/create-user.usecase";
import { MockUserGateway } from "../../../application/usecases/user/mock-user-gateway";
import { UpdateUserUseCase } from "../../../application/usecases/user/update-user.usecase";
import { CreateUserRoute } from "../../api/express/routes/user/create-user.express";
import { UpdateUserRoute } from "../../api/express/routes/user/update-user.express";
import { AuthenticateJWT } from "../../authenticate/jwt/authenticate.jwt";
import { JwtMiddleware } from "../../middleware/jwt/middleware.jwt";

export class UserFlowFactory {
    static create(mockUserGateway: MockUserGateway, authenticateJWT: AuthenticateJWT, jwtMiddleware: JwtMiddleware): any {
        
        const createUserUseCase = CreateUserUseCase.create(mockUserGateway, authenticateJWT);
        const createUserRoute = CreateUserRoute.create(createUserUseCase);

        const updateUserUseCase = UpdateUserUseCase.create(mockUserGateway);
        const updateUserRoute = UpdateUserRoute.create(updateUserUseCase, jwtMiddleware)
        return [
            createUserRoute,
            updateUserRoute
        ];
    }
}
