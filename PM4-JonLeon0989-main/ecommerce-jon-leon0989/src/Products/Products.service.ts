import { Injectable } from '@nestjs/common';
import { ProductsRespository } from './Products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRespository: ProductsRespository) {}

  getAll(page: number, limit: number) {
    return this.productsRespository.getAll(page, limit);
  }

  getById(id: number) {
    return this.productsRespository.getById(id);
  }

  create(product) {
    return this.productsRespository.create(product);
  }

  update(id: number, product) {
    return this.productsRespository.update(id, product);
  }

  delete(id: number) {
    return this.productsRespository.delete(id);
  }
}