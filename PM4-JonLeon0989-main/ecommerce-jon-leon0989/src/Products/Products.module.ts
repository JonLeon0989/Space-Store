import { Module } from '@nestjs/common';
import { ProductsService } from './Products.service';
import { ProductsRespository } from './Products.repository';
import { ProdutsController } from './Products.controller';


@Module({
  providers: [ProductsService,ProductsRespository],
  controllers: [ProdutsController],
})
export class ProductsModule {}
