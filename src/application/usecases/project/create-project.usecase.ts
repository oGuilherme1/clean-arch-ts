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
    project: Project
}

export class CreateProjectUseCase implements UseCase<CreateProjectInput, CreateProjectOutput> {

    private constructor(private readonly projectGateway: ProjectGateway) { }

    public static create(projectGateway: ProjectGateway) {
        return new CreateProjectUseCase(projectGateway);
    }

    public async execute({ userId, name, description, startDate, expectedEndDate }: CreateProjectInput): Promise<CreateProjectOutput> {

        try {
            const aProject = Project.create({
                userId,
                name,
                description,
                startDate,
                expectedEndDate
            })

            await this.projectGateway.store(aProject);
            
            const output = this.presentOutput(aProject);

            return output;

        } catch (error: any) {
           return error;
        }

    }

    private presentOutput(project: Project): CreateProjectOutput {
        return {
            project: project
        };
    }

}
