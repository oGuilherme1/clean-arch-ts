import { ProjectGateway } from "../../../domain/gateways/project.gateway";
import { UseCase } from "../usecase";
import { Project } from "../../../domain/entities/project";

export type ShowProjectInput = {
    userId: string;
    projectId: string;
}

export type ShowProjectOutput = {
    project: Project;
}

export class ShowProjectUseCase implements UseCase<ShowProjectInput, ShowProjectOutput> {

    private constructor(private readonly projectGateway: ProjectGateway) { }

    public static create(projectGateway: ProjectGateway) {
        return new ShowProjectUseCase(projectGateway);
    }

    public async execute({ userId, projectId }: ShowProjectInput): Promise<ShowProjectOutput> {
        
        const project = await this.projectGateway.show(userId, projectId);

        if (!project) {
            throw new Error('Project not found');
        }

        return { project };
    }
}
