import { describe, expect, it } from 'vitest';
import { MockProjectGateway } from '../../src/application/usecases/project/mock-project.gateway';
import { UpdateProjectInput, UpdateProjectUseCase } from '../../src/application/usecases/project/update-project.usecase';
import { Project } from '../../src/domain/entities/project';


describe('UpdateProjectUseCase', () => {
  it('should update an existing project successfully', async () => {
    // Mock data for the input
    const input: UpdateProjectInput = {
      projectId: 'project123',
      description: 'Updated project description',
    };

    // Mock existing project data
    const existingProject = Project.create({
      userId: 'user123',
      name: 'Test Project',
      description: 'Old project description',
      startDate: new Date('2024-05-20'), // Data anterior
      expectedEndDate: new Date('2024-06-21'), // Data posterior
    }, input.projectId);

    // Crie uma instância do mock do gateway
    const projectGateway = new MockProjectGateway();

    // Adicione o projeto existente ao mock do gateway
    projectGateway.store(existingProject);

    // Crie uma instância do caso de uso
    const updateProjectUseCase = UpdateProjectUseCase.create(projectGateway);

    // Execute o caso de uso
    const output = await updateProjectUseCase.execute(input);

    // Verifique se o projeto foi atualizado corretamente
    expect(output.updatedProject.id).toBe(existingProject.id);
    expect(output.updatedProject.description).toBe(input.description);

    // Verifique se o projeto atualizado foi armazenado corretamente
    const updatedProject = await projectGateway.findById(existingProject.id);
    expect(updatedProject).not.toBeNull();
    expect(updatedProject!.description).toBe(input.description);
  });

  it('should throw an error if project not found', async () => {
    const input: UpdateProjectInput = {
      projectId: 'nonExistentProjectId',
      description: 'Updated project description',
    };

    const projectGateway = new MockProjectGateway();

    // Crie uma instância do caso de uso
    const updateProjectUseCase = UpdateProjectUseCase.create(projectGateway);

    // Execute o caso de uso e verifique se ele lança um erro
    await expect(updateProjectUseCase.execute(input));
  });
});
