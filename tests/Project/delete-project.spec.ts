import { describe, expect, it } from 'vitest';
import { MockProjectGateway } from '../../src/application/usecases/project/mock-project.gateway';
import { Project } from '../../src/domain/entities/project';
import { DeleteProjectInput, DeleteProjectUseCase } from '../../src/application/usecases/project/delete-project.usecase';


describe('UpdateProjectUseCase', () => {
  it('should update an existing project successfully', async () => {
    // Mock data for the input
    const input: DeleteProjectInput = {
      projectId: 'project123'
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
    const deleteProjectUseCase = DeleteProjectUseCase.create(projectGateway);

    // Execute o caso de uso
    const output = await deleteProjectUseCase.execute(input);

    // Verifique se o projeto foi excluído corretamente
    expect(output.message).toBe('Project deleted');

    // Verifique se o projeto foi removido do mock do gateway
    const deletedProject = await projectGateway.findById(input.projectId);
    expect(deletedProject).toBeNull();
    console.log(deletedProject);
  });

  it('should throw an error if project not found', async () => {
    const input: DeleteProjectInput = {
      projectId: 'nonExistentProjectId',
    };

    // Crie uma instância do mock do gateway sem projetos existentes
    const projectGateway = new MockProjectGateway();

    // Crie uma instância do caso de uso
    const deleteProjectUseCase = DeleteProjectUseCase.create(projectGateway);

    // Execute o caso de uso e verifique se ele lança um erro
    await expect(deleteProjectUseCase.execute(input));
  });
});
