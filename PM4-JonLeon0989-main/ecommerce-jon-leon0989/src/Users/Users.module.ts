import { Module } from '@nestjs/common';
import { UsersService } from './Users.service';
import { UserRespository } from './Users.repository';
import { UsersController } from './Users.controller';


@Module({
  providers: [UsersService,UserRespository],
  controllers: [UsersController],
  exports: [UserRespository],
})
export class UsersModule {}
