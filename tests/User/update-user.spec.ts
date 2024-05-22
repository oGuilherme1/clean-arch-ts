import { describe, it, expect } from "vitest";
import { MockUserGateway } from "../../src/application/usecases/user/mock-user-gateway";
import { UpdateUserUseCase } from "../../src/application/usecases/user/update-user.usecase";
import { User } from "../../src/domain/entities/user";

describe('UpdateUserUseCase', () => {
    it('should update user information successfully', async () => {
        // Arrange
        const mockUserGateway = new MockUserGateway();
        const updateUserUseCase = UpdateUserUseCase.create(mockUserGateway);

        const user = User.create({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'oldPassword123'
        });
        await mockUserGateway.store(user);

        const updatedName = 'Jane Doe';
        const updatedPassword = 'newPassword456';
        const updatedUserOutput = await updateUserUseCase.execute({
            userId: user.id,
            name: updatedName,
            password: updatedPassword
        });

        // Assert
        const updatedUser = updatedUserOutput.updatedUser;
        expect(updatedUser).toBeDefined();
        expect(updatedUser.name).toBe(updatedName);
        expect(updatedUser.password).toBe(updatedPassword);
    });


});