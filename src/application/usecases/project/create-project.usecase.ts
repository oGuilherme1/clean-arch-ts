import { Project } from "../../../domain/entities/project";
import { ProjectGateway } from "../../../domain/gateways/project.gateway";
import { UseCase } from "../usecase";

export type CreateProjectInput = {
    userId: string;
    name: string;
    description: string;
    startDate: Date;
    expectedEndDate: Date;
}

export type CreateProjectOutput = {
    id: string;
    message: string
}

export class CreateProjectUseCase implements UseCase<CreateProjectInput, CreateProjectOutput> {

    private constructor(private readonly projectGateway: ProjectGateway) { }

    public static create(projectGateway: ProjectGateway) {
        return new CreateProjectUseCase(projectGateway);
    }

    public async execute({ userId, name, description, startDate, expectedEndDate }: CreateProjectInput): Promise<CreateProjectOutput> {

        const aProject = Project.create({
            userId,
            name, 
            description, 
            startDate, 
            expectedEndDate
        })

        try {
            await this.projectGateway.store(aProject);
        }
        catch (error: any) {
            throw new Error('Error storing project: ' + error.message);
        }

        const output = this.presentOutput(aProject);

        return output;

    }

    private presentOutput(project: Project): CreateProjectOutput {
        return {
            id: project.id,
            message: `Project ${project.name} created successfully`
        };
    }

}
