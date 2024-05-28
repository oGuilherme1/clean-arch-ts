import { Project } from "../../../domain/entities/project";
import { ProjectGateway } from "../../../domain/gateways/project.gateway";

export class MockProjectGateway implements ProjectGateway {

    private projects: Project[] = [];

    public async index(idUser: string): Promise<Project[] | null> {
        const project = this.projects.filter(project => project.userId === idUser);
        return project || null;
    }

    public async show(idProject: string): Promise<Project | null> {
        const project = this.projects.find(project => project.id === idProject);
        
        return project || null;
    }

    public async store(project: Project): Promise<void> {
        this.projects.push(project);
    }

    public async update(project: Project): Promise<void> {
        const projectIndex = this.projects.findIndex(p => p.id === project.id);
        this.projects[projectIndex] = project;
    }

    public async destroy(id: string): Promise<void> {
        const projectIndex = this.projects.findIndex(project => project.id === id);
        this.projects.splice(projectIndex, 1);
    }

    public async findById(id: string): Promise<Project | null> {
        const project = this.projects.find(p => p.id === id);
        return project || null;
    }
}
