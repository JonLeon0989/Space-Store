import { Injectable } from '@nestjs/common';
import { UserRespository } from 'src/Users/Users.repository';


@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRespository) {}

  getAuth() {
    return { message: 'Auth endpoint' };
  }

  async signIn(email: string, password: string): Promise<string> {
    const user = this.userRepository.getByEmail(email);
    if (!user || user.password !== password) {
      throw new Error('Email o password incorrectos');
    }
    return 'Login successful';
  }
}