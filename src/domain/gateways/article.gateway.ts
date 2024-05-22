import { Article } from "../entities/article";

export interface ArticleGateway {
    index(): Promise<Article[]>;
    show(id: string): Promise<Article>;
    store(article: Article): Promise<void>;
    update(article: Article, id: string): Promise<void>;
    destroy(id: string): Promise<void>;
}