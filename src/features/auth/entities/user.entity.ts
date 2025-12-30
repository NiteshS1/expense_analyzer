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

  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
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
