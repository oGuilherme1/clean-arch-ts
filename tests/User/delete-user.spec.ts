import { describe, expect, it } from 'vitest';
import { CreateUserUseCase } from '../../src/application/usecases/user/create-user.usecase';
import { DeleteUserUseCase } from '../../src/application/usecases/user/delete-user.usecase';
import { AuthenticateJWT } from '../../src/infra/authenticate/jwt/authenticate.jwt';
import { MockUserGateway } from '../../src/application/usecases/user/mock-user-gateway';

describe('DeleteUserUseCase', () => {
    it('should delete a user if it exists', async () => {
        // Arrange
        const mockUserGateway = new MockUserGateway();
        const authenticateJWT = new AuthenticateJWT();

        const createUserUseCase = CreateUserUseCase.create(mockUserGateway, authenticateJWT);
        const deleteUserUseCase = DeleteUserUseCase.create(mockUserGateway);

        const userData = {
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            password: '1234567891911'
        };

        console.log('Creating user...');
        const createdUser = await createUserUseCase.execute(userData);
        console.log('User created:', createdUser);

        // Act
        const deleteInput = { userId: createdUser.id };
        console.log('Deleting user...');
        const deleteResult = await deleteUserUseCase.execute(deleteInput);
        console.log('Delete result:', deleteResult);

        // Assert
        expect(deleteResult.message).toBe("User deleted");

        // Verify user is deleted
        const deletedUser = await mockUserGateway.findById(createdUser.id);
        console.log('Deleted user (should be null):', deletedUser);
        expect(deletedUser).toBeNull();
    });

    it('should throw an error if the user does not exist', async () => {
        // Arrange
        const mockUserGateway = new MockUserGateway();
        const deleteUserUseCase = DeleteUserUseCase.create(mockUserGateway);

        const deleteInput = { userId: 'non-existent-id' };

        // Act & Assert
        console.log('Attempting to delete a non-existent user...');
        await expect(deleteUserUseCase.execute(deleteInput));
        console.log('Non-existent user deletion attempt threw expected error');
    });
});
