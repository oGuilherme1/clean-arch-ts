import { Entity } from "../../core/domain/Entity";

type ArticleProps = {
    projectId: string;
    title: string;
    content: string;
    author: string; 
}

export class Article extends Entity<ArticleProps>{

    private constructor(props: ArticleProps, id?: string){
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
}