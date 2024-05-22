import { Project } from "../entities/project";

export interface ProjectGateway {
    index(idUser: string): Promise<Project[]>;
    show(idProject: string, idUser: string): Promise<Project>;
    store(project: Project): Promise<void>;
    update(project: Project): Promise<void>;
    destroy(id: string): Promise<void>;
    findById(id: string): Promise<Project | null>;
}