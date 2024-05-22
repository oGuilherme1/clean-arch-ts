import { Project } from "../../../domain/entities/project";
import { ProjectGateway } from "../../../domain/gateways/project.gateway";

export class MockProjectGateway implements ProjectGateway {

    private projects: Project[] = [];

    public async index(idUser: string): Promise<Project[]> {
        return this.projects.filter(project => project.userId === idUser);
    }

    public async show(idProject: string, idUser: string): Promise<Project> {
        const project = await this.findById(idProject);
        
        if (!project) {
            throw new Error(`Projeto com ID ${idProject} não encontrado`);
        }
        if (project.userId !== idUser) {
            throw new Error(`Usuário não autorizado a acessar o projeto com ID ${idProject}`);
        }
        return project;
    }

    public async store(project: Project): Promise<void> {
        this.projects.push(project);
    }

    public async update(project: Project): Promise<void> {
        const existingProject = await this.findById(project.id);
        if (!existingProject) {
            throw new Error(`Projeto com ID ${project.id} não encontrado`);
        }
        const projectIndex = this.projects.findIndex(p => p.id === project.id);
        this.projects[projectIndex] = project;
    }

    public async destroy(id: string): Promise<void> {
        const projectIndex = this.projects.findIndex(project => project.id === id);
        if (projectIndex === -1) {
            throw new Error(`Projeto com ID ${id} não encontrado`);
        }
        this.projects.splice(projectIndex, 1);
    }

    public async findById(id: string): Promise<Project | null> {
        const project = this.projects.find(p => p.id === id);
        return project || null;
    }
}
