import { Injectable, NotFoundException } from '@nestjs/common';
import { users } from './Users.data';

type User = {
  id: number;
  email: string;
  name: string;
  password: string;
  address: string;
  phone: string;
  country?: string | undefined;
  city?: string | undefined;
};

@Injectable()
export class UserRespository {
  private users: User[] = users;

  getAll(page: number = 1, limit: number = 5): Omit<User, 'password'>[] {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return this.users.slice(startIndex, endIndex).map(({ password, ...rest }) => rest);
  }


  getById(id: number): Omit<User, 'password'> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, ...rest } = user;
    return rest;
  }

  getByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  create(user: Omit<User, 'id'>): number {
    const newId = this.users.length ? this.users[this.users.length - 1].id + 1 : 1;
    this.users.push({ ...user, id: newId });
    return newId;
  }

  update(id: number, user: Partial<Omit<User, 'id'>>): number {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }
    this.users[userIndex] = { ...this.users[userIndex], ...user };
    return id;
  }

  delete(id: number): number {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }
    this.users.splice(userIndex, 1);
    return id;
  }
}