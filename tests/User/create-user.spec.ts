import { describe, expect, it } from 'vitest'
import { CreateUserUseCase } from '../../src/application/usecases/user/create-user.usecase'
import { AuthenticateJWT } from '../../src/infra/authenticate/jwt/authenticate.jwt';
import { MockUserGateway } from '../../src/application/usecases/user/mock-user-gateway';

describe('CreateUserUsecase', () => {
    it('should create a user successfully and generate a token', async () => {
        const mockUserGateway = new MockUserGateway();
        const authenticateJWT = new AuthenticateJWT();

        const createUserUsecase = CreateUserUseCase.create(mockUserGateway, authenticateJWT);

        const userData = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: '123456789101'
        };

        const result = await createUserUsecase.execute(userData);

        expect(result.access_token).toBeDefined();
        expect(result.refresh_token).toBeDefined();
        expect(typeof result.access_token).toBe('string');
        expect(typeof result.refresh_token).toBe('string');
        console.log('Access_token:', result.access_token); 
        console.log('Refresh_token:', result.refresh_token); 

        
        const createdUser = await mockUserGateway.show(result.id);
        expect(createdUser).toBeDefined();
        expect(createdUser.name).toBe(userData.name);
        expect(createdUser.email).toBe(userData.email);
        console.log('Created data:', createdUser);
    });
});
