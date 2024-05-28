import { Project } from "../../../domain/entities/project";
import { ProjectGateway } from "../../../domain/gateways/project.gateway";
import { UseCase } from "../usecase";

export type UpdateProjectInput = {
    projectId: string;
    description: string;
}

export type UpdateProjectOutput = {
    updatedProject: Project;
    message?: string
}

export class UpdateProjectUseCase implements UseCase<UpdateProjectInput, UpdateProjectOutput> {

    private constructor(private readonly projectGateway: ProjectGateway,) { }

    public static create(projectGateway: ProjectGateway) {
        return new UpdateProjectUseCase(projectGateway,);
    }

    public async execute({ projectId, description }: UpdateProjectInput): Promise<UpdateProjectOutput>  {

        try {
            const existingProject = await this.projectGateway.findById(projectId);

            if (!existingProject) {
                throw new Error('Project not found');
            }

            const updatedProject = Project.create({
                userId: existingProject.userId,
                name: existingProject.name,
                description: description,
                startDate: existingProject.startDate,
                expectedEndDate: existingProject.expectedEndDate
            }, existingProject.id);

            await this.projectGateway.update(updatedProject);

            return { updatedProject };
            
        } catch (error: any) {
            return error;
        }
    }
}