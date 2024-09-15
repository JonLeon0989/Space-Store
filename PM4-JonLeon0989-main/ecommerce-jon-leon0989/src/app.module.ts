import { Module } from '@nestjs/common';
import { UsersModule } from './Users/Users.module';
import { ProductsModule } from './Products/Products.module';
import { AuthModule } from './Auth/Auth.module';

@Module({
  imports: [UsersModule, ProductsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
