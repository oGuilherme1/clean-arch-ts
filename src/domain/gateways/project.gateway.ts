import { Project } from "../entities/project";

export interface ProjectGateway {
    index(idUser: string): Promise<Project[] | null>;
    show(idProject: string): Promise<Project | null>;
    store(project: Project): Promise<void>;
    update(project: Project): Promise<void>;
    destroy(id: string): Promise<void>;
    findById(id: string): Promise<Project | null>;
}