import { Article } from "../entities/article";
import { Project } from "../entities/project";

export interface ArticleGateway {
    index(idProject: string): Promise<Article[] | null>;
    show(id: string): Promise<Article | null>;
    store(article: Article): Promise<void>;
    update(article: Article): Promise<void>;
    destroy(id: string): Promise<void>;
    findByProjectID(projectID: string ): Promise<Project | null>
    findByArticleID(articleID: string): Promise<Article | null>
    findByTitle(title: string): Promise<boolean>
}