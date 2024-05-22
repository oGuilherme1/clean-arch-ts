import { MockProjectGateway } from "./application/usecases/project/mock-project.gateway";
import { MockUserGateway } from "./application/usecases/user/mock-user-gateway";
import { ApiExpress } from "./infra/api/express/api.expres";
import { AuthenticateJWT } from "./infra/authenticate/jwt/authenticate.jwt";
import { ProjectFlowFactory } from "./infra/factory/project/project.factory";
import { UserFlowFactory } from "./infra/factory/user/user.factory";
import { JwtMiddleware } from "./infra/middleware/jwt/middleware.jwt";

function main() {

    const authenticateJWT = new AuthenticateJWT();
    const jwtMiddleware = new JwtMiddleware(authenticateJWT);

    const mockUserGateway = new MockUserGateway();
    const userFactory = UserFlowFactory.create(mockUserGateway, authenticateJWT, jwtMiddleware);

    const mockProjectGateway = new MockProjectGateway();
    const projectFactory = ProjectFlowFactory.create(mockProjectGateway, authenticateJWT, jwtMiddleware)

    const api = ApiExpress.create([
        userFactory, 
        projectFactory
    ]);

    const port = 8000;

    api.start(port);
}

main();