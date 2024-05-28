import { Article } from "../../../domain/entities/article";
import { Project } from "../../../domain/entities/project";
import { ArticleGateway } from "../../../domain/gateways/article.gateway";

export class MockArticleGateway implements ArticleGateway {

    private articles: Article[] = [];
    private project: Project[] = [];


    public async index(idProject: string): Promise<Article[] | null> {
        const article = this.articles.filter(article => article.projectId === idProject);
        return article || null;
    }

    public async show(idArticle: string): Promise<Article | null> {
        const article = this.articles.find(article => article.id === idArticle);
        
        return article || null;
    }

    public async store(article: Article): Promise<void> {
        this.articles.push(article);
    }

    public async update(article: Article): Promise<void> {
        const articleIndex = this.articles.findIndex(p => p.id === article.id);
        this.articles[articleIndex] = article;
    }

    public async destroy(id: string): Promise<void> {
        const articleIndex = this.articles.findIndex(article => article.id === id);
        this.articles.splice(articleIndex, 1);
    }

    public async findByProjectID(projectID: string): Promise<Project | null> {
        const project = this.project.find(project => project.id === projectID);
        return project || null;
    }
    public async findByArticleID(articleID: string): Promise<Article | null> {
        const article = this.articles.find(article => article.id === articleID);
        return article || null;
    }

    public async findByTitle(title: string): Promise<boolean> {
        const articleTitle = this.articles.find(article => article.title.toLowerCase() === title.toLowerCase());
        return !!articleTitle;
    }
}
