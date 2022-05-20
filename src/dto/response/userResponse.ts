import { User } from '~/models';

export class UserResponse {
    id!: number;

    userId!: number;

    name!: string;

    userType!: string;

    email!: string;

    phone!: string;

    constructor(user: User) {
        this.id = user.id;
        this.userId = user.userId;
        this.name = user.name;
        this.userType = user.userType;
        this.email = user.email;
        this.phone = user.phone;
    }
}
