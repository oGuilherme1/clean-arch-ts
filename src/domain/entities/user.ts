import { Entity } from "../../core/domain/Entity";

type UserProps = {
    name: string;
    email: string;
    password: string; 
}

export class User extends Entity<UserProps>{

    private constructor(props: UserProps, id?: string){
        super(props, id)
    }

    public static create(props: UserProps, id?: string){
        User.validateProps(props);

        const user = new User(props, id);
        return user;
    }

    public get id() {
        return this._id;
    }

    public get name() {
        return this.props.name;
    }

    public get email() {
        return this.props.email;
    }

    public get password() {
        return this.props.password;
    }

    private static validateProps(props: UserProps): void {

        if (!props.name) {
            throw new Error('Name is required.');
        }

        if(typeof props.name !== 'string' || props.name.trim().length === 0){
            throw new Error('Name must be a string.');
        }

        if (!props.email) {
            throw new Error('Email is required.');
        }

        if (typeof props.email !== 'string') {
            throw new Error('Email must be a string.');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(props.email)) {
            throw new Error('Email must be a valid email address.');
        }

        if (!props.password) {
            throw new Error('Password is required.');
        }

        if (typeof props.password !== 'string') {
            throw new Error('Password must be a string.');
        }

        if (props.password.length < 12) {
            throw new Error('Password must be longer than 12 characters');
        }
    }
    
}