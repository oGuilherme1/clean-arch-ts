import { User } from "../entities/user";

export interface UserGateway {
    show(id: string): Promise<User | null>;
    store(user: User): Promise<void>;
    update(user: User): Promise<void>;
    destroy(id: string): Promise<void>;
    findById(id: string): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
}