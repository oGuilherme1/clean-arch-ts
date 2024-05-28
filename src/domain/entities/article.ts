import { Entity } from "../../core/domain/Entity";

type ArticleProps = {
    projectId: string;
    title: string;
    content: string;
    author: string; 
}

export class Article extends Entity<ArticleProps>{

    private constructor(props: ArticleProps, id?: string){
        Article.validateProjectProps(props);
        super(props, id)
    }

    public static create(props: ArticleProps, id?: string){
        const article = new Article(props, id);
        
        return article;
    }

    public get id() {
        return this._id;
    }

    public get projectId() {
        return this.props.projectId;
    }

    public get title() {
        return this.props.title;
    }

    public get content() {
        return this.props.content;
    }

    public get author() {
        return this.props.author;
    }

    private static validateProjectProps(props: ArticleProps): void {

    
        if (!props.projectId) {
            throw new Error('Project ID is required.');
        }
    
        if (typeof props.projectId !== 'string' || props.projectId.trim().length === 0) {
            throw new Error('Project ID must be a non-empty string.');
        }
    
        if (!props.title) {
            throw new Error('Title is required.');
        }
    
        if (typeof props.title !== 'string' || props.title.trim().length === 0) {
            throw new Error('Title must be a non-empty string.');
        }
        
        if (!props.content) {
            throw new Error('Content is required.');
        }
    
        if (typeof props.content !== 'string' || props.content.trim().length === 0) {
            throw new Error('Content must be a non-empty string.');
        }

        if (!props.author) {
            throw new Error('Author is required.');
        }
    
        if (typeof props.author !== 'string' || props.author.trim().length === 0) {
            throw new Error('Author must be a non-empty string.');
        }
    
    }
}