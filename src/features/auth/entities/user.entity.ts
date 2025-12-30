export class User {
    id!: string;
    first_name!: string;
    last_name!: string;
    email!: string;
    password!: string;
    createdAt!: Date;
    updatedAt!: Date;

    constructor(data: Partial<User>) {
        Object.assign(this, data);
    }

    toJSON () {
        return {
            id: this.id,
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            password: this.password,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}


// first name
// last name
// email
// password


// Transaction

// id
// user_id
// money
// cate
// type - depo / withdraw
// creared_at