import { ProjectGateway } from "../../../domain/gateways/project.gateway";
import { UseCase } from "../usecase";

export type DeleteProjectInput = {
    projectId: string;
}

export type DeleteProjectOutput = {
    message: string;
}


export class DeleteProjectUseCase implements UseCase<DeleteProjectInput, DeleteProjectOutput> {

    private constructor(private readonly projectGateway: ProjectGateway,) { }

    public static create(projectGateway: ProjectGateway) {
        return new DeleteProjectUseCase(projectGateway,);
    }

    public async execute({ projectId }: DeleteProjectInput): Promise<DeleteProjectOutput> {

        try {
            const existingProject = await this.projectGateway.findById(projectId);

            if (!existingProject) {
                throw new Error("Project not found");
            }

            await this.projectGateway.destroy(projectId);

            const output = {
                message: "Project deleted"
            }

            return output;

        } catch (error: any) {
            return error;
        }

    }

}