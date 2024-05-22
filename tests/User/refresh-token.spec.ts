import { describe, it } from "vitest";
import { CreateUserUseCase } from "../../src/application/usecases/user/create-user.usecase";
import { MockUserGateway } from "../../src/application/usecases/user/mock-user-gateway";
import { AuthenticateJWT } from "../../src/infra/authenticate/jwt/authenticate.jwt";
import { VerifyTokenUsecase } from "../../src/application/usecases/authenticate/verify-token.usecase";
import { RefreshTokenUsecase } from "../../src/application/usecases/authenticate/refresh-token-usecase";

describe('Token Verification', () => {
    it('Verifying if the token has expired', async () => {
        const mockUserGateway = new MockUserGateway();
        const authenticateJWT = new AuthenticateJWT();

        const createUserUsecase = CreateUserUseCase.create(mockUserGateway, authenticateJWT);

        const userData = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: '123456789101'
        };

        const createUser = await createUserUsecase.execute(userData);
        
        const verifyTokenUsecase = VerifyTokenUsecase.create(authenticateJWT);

        const refreshTokenUsecase = RefreshTokenUsecase.create(authenticateJWT);

        const refreshToken = await refreshTokenUsecase.execute({refresh_token: createUser.refresh_token});

        const verifyToken = await verifyTokenUsecase.execute({token: createUser.access_token});

        const verifySecondToken = await verifyTokenUsecase.execute({token: createUser.access_token});

        console.log('First Tokens:', createUser);
        console.log('Second Tokens:', refreshToken);
    })
})
