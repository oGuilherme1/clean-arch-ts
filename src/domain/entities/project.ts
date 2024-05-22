import { Entity } from "../../core/domain/Entity";

type ProjectProps = {
    userId: string;
    name: string;
    description: string;
    startDate: Date;
    expectedEndDate: Date;
}

export class Project extends Entity<ProjectProps>{

    private constructor(props: ProjectProps, id?: string){
        Project.validateProjectProps(props);
        super(props, id)
    }

    public static create(props: ProjectProps, id?: string){
        const project = new Project(props, id);

        return project;
    }

    public get id() {
        return this._id;
    }

    public get userId() {
        return this.props.userId;
    }

    public get name() {
        return this.props.name;
    }

    public get description() {
        return this.props.description;
    }

    public get startDate() {
        return this.props.startDate;
    }

    public get expectedEndDate() {
        return this.props.expectedEndDate;
    }

    private static validateProjectProps(props: ProjectProps): void {

        if (!props.userId) {
            throw new Error('User ID is required.');
        }
    
        if (typeof props.userId !== 'string' || props.userId.trim().length === 0) {
            throw new Error('User ID must be a non-empty string.');
        }
    
        if (!props.name) {
            throw new Error('Name is required.');
        }
    
        if (typeof props.name !== 'string' || props.name.trim().length === 0) {
            throw new Error('Name must be a non-empty string.');
        }
    
        if (!props.description) {
            throw new Error('Description is required.');
        }
    
        if (typeof props.description !== 'string' || props.description.trim().length === 0) {
            throw new Error('Description must be a non-empty string.');
        }
    
        if (!(props.startDate instanceof Date) || isNaN(props.startDate.getTime())) {
            throw new Error('Start date must be a valid Date object.');
        }
    
        if (!(props.expectedEndDate instanceof Date) || isNaN(props.expectedEndDate.getTime())) {
            throw new Error('Expected end date must be a valid Date object.');
        }
    
        if (props.expectedEndDate <= props.startDate) {
            throw new Error('Expected end date must be after start date.');
        }
    }
}