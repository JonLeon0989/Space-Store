import { Injectable } from '@nestjs/common';
import { UserRespository } from './Users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRespository: UserRespository) {}

  getAll(page: number, limit: number) {
    return this.userRespository.getAll(page, limit);
  }

  getById(id: number) {
    return this.userRespository.getById(id);
  }

  create(user) {
    return this.userRespository.create(user);
  }

  update(id: number, user) {
    return this.userRespository.update(id, user);
  }

  delete(id: number) {
    return this.userRespository.delete(id);
  }
}
