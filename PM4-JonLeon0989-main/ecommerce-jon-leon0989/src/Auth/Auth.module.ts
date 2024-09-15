import { Module } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { UsersModule } from 'src/Users/Users.module';
import { UserRespository } from 'src/Users/Users.repository';
import { AuthGuard } from './auth.guard';
import { AuthController } from './Auth.controller';

@Module({
  imports: [UsersModule],
  providers: [AuthService, UserRespository, AuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
