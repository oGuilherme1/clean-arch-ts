import { describe, expect, it } from 'vitest';
import { CreateProjectInput, CreateProjectUseCase } from '../../src/application/usecases/project/create-project.usecase';
import { MockProjectGateway } from '../../src/application/usecases/project/mock-project.gateway';
import { CreateUserUseCase } from '../../src/application/usecases/user/create-user.usecase';
import { MockUserGateway } from '../../src/application/usecases/user/mock-user-gateway';
import { AuthenticateJWT } from '../../src/infra/authenticate/jwt/authenticate.jwt';


describe('CreateProjectUseCase', () => {
  it('should create a new project successfully', async () => {

    const mockUserGateway = new MockUserGateway();
    const authenticateJWT = new AuthenticateJWT();

    const createUserUsecase = CreateUserUseCase.create(mockUserGateway, authenticateJWT);

    const userData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '123456789101'
    };

    const result = await createUserUsecase.execute(userData);

    // Mock data for the input
    const input: CreateProjectInput = {
      userId: result.id,
      name: 'Test Project',
      description: 'This is a test project',
      startDate: new Date('2024-05-21'),
      expectedEndDate: new Date('2024-06-21'),
    };

    const projectGateway = new MockProjectGateway();

    // Crie uma instância do caso de uso
    const createProjectUseCase = CreateProjectUseCase.create(projectGateway);

    // Execute o caso de uso
    const project1 = await createProjectUseCase.execute(input);
    const project2 = await createProjectUseCase.execute(input);

    // Verifique se a saída do caso de uso está correta
    expect(project1).toEqual(expect.objectContaining({
      id: expect.any(String),
      message: `Project ${input.name} created successfully`,
    }));

    expect(project2).toEqual(expect.objectContaining({
      id: expect.any(String),
      message: `Project ${input.name} created successfully`,
    }));

    const projectData = await projectGateway.index();

    console.log('Projects:', projectData);
  });

});
