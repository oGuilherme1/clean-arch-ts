import { Article } from "../../../domain/entities/article";
import { ArticleGateway } from "../../../domain/gateways/article.gateway";
import { UseCase } from "../usecase";

export type CreateArticleInput = {
    projectId: string;
    title: string;
    content: string;
    author: string;
}

export type CreateArticleOutput = {
    article: Article;
}

export class CreateArticleUseCase implements UseCase<CreateArticleInput, CreateArticleOutput> {

    private constructor(private readonly articleGateway: ArticleGateway) { }

    public static create(articleGateway: ArticleGateway) {
        return new CreateArticleUseCase(articleGateway);
    }

    public async execute({ projectId, title, content, author }: CreateArticleInput): Promise<CreateArticleOutput> {
        try {
            const existingProject = this.articleGateway.findByProjectID(projectId);

            if(!existingProject){
                throw new Error('Project not found');
            }

            const existingTitle = await this.articleGateway.findByTitle(title);

            if(existingTitle){
                throw new Error('Title already exists');
            } 

            const aArticle = Article.create({
                projectId,
                title,
                content, 
                author
            })

            await this.articleGateway.store(aArticle);

            const output = this.presentOutput(aArticle);

            return output;

        } catch (error: any) {
            return error;
        }
    }

    private presentOutput(article: Article): CreateArticleOutput {
        return {
            article: article
        };
    }
}