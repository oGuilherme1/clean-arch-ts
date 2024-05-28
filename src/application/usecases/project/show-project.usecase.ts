import { ProjectGateway } from "../../../domain/gateways/project.gateway";
import { UseCase } from "../usecase";
import { Project } from "../../../domain/entities/project";

export type ShowProjectInput = {
    projectId: string
}

export type ShowProjectOutput = {
    project: Project;
}

export class ShowProjectUseCase implements UseCase<ShowProjectInput, ShowProjectOutput> {

    private constructor(private readonly projectGateway: ProjectGateway) { }

    public static create(projectGateway: ProjectGateway) {
        return new ShowProjectUseCase(projectGateway);
    }

    public async execute({ projectId }: ShowProjectInput): Promise<ShowProjectOutput> {

        try{

            const project = await this.projectGateway.show(projectId);

            if(!project ) {
                throw new Error('Project not found');
            }

            return { project };

        } catch(error: any){
            return error;
        }
        
    }
}
