import { User } from "../../../domain/entities/user";
import { UserGateway } from "../../../domain/gateways/user.gateway";

export class MockUserGateway implements UserGateway {

    private users: User[] = [];

    public async show(id: string): Promise<User | null> {
        const user = await this.findById(id);
        return user || null;
    }

    public async store(user: User): Promise<void> {
        this.users.push(user);
    }

    public async findById(id: string): Promise<User | null> {
        const user = this.users.find(u => u.id === id);
        return user || null;
    }

    public async findUserByEmail(email: string): Promise<User | null> {
        const user = this.users.find(user => user.email === email);
        return user || null;
    }

    public async update(user: User): Promise<void> {
        const userIndex = this.users.findIndex(u => u.id === user.id);
        this.users[userIndex] = user;
    }

    public async destroy(id: string): Promise<void> {
        const userIndex = this.users.findIndex(user => user.id === id);
        this.users.splice(userIndex);
    }
}
