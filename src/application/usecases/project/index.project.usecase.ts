import { ProjectGateway } from "../../../domain/gateways/project.gateway";
import { UseCase } from "../usecase";
import { Project } from "../../../domain/entities/project";

export type IndexProjectInput = {
    userId: string,
}

export type IndexProjectsOutput = {
    projects: Project[];
}

export class IndexProjectsUseCase implements UseCase<IndexProjectInput, IndexProjectsOutput> {

    private constructor(private readonly projectGateway: ProjectGateway) { }

    public static create(projectGateway: ProjectGateway) {
        return new IndexProjectsUseCase(projectGateway);
    }

    public async execute({userId}: IndexProjectInput): Promise<IndexProjectsOutput> {

        try {

            const projects = await this.projectGateway.index(userId);

            if(!projects) {
                throw new Error('No projects found');
            }
            
            return { projects };

        } catch(error: any){
            return error;
        }

    }
}
