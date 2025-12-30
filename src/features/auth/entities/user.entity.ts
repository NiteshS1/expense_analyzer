export class User {
    id!: string;
    full_name!: string;
    email!: string;

    constructor(data: Partial<User>) {
        Object.assign(this, data);
    }

    toJSON () {
        return {
            id: this.id,
            full_name: this.full_name,
            email: this.email,
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