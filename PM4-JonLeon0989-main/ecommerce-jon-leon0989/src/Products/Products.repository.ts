import { Injectable, NotFoundException } from "@nestjs/common";
import { products } from "./Products.data";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: boolean;
  imgUrl: string;
}

@Injectable()
export class ProductsRespository {
  private products: Product[] = products;

  getAll(page: number, limit: number): Product[] {
    const start = (page - 1) * limit;
    const end = start + limit;
    return this.products.slice(start, end);
  }

  getById(id: number): Product {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  create(product: Omit<Product, 'id'>): number {
    const newId = this.products.length ? this.products[this.products.length - 1].id + 1 : 1;
    this.products.push({ ...product, id: newId });
    return newId;
  }

  update(id: number, product: Partial<Omit<Product, 'id'>>): number {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      throw new NotFoundException('Product not found');
    }
    this.products[productIndex] = { ...this.products[productIndex], ...product };
    return id;
  }

  delete(id: number): number {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      throw new NotFoundException('Product not found');
    }
    this.products.splice(productIndex, 1);
    return id;
  }
}