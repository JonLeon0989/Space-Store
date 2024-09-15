import { Controller, Get, Param, Post, Put, Delete, Body, HttpCode, HttpStatus, NotFoundException, BadRequestException, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './Products.service';
import { AuthGuard } from '../Auth/auth.guard';

@Controller('products')
export class ProdutsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll(@Query('page') page: string, @Query('limit') limit: string) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 5;

    if (isNaN(pageNumber) || pageNumber < 1) {
      throw new BadRequestException('Invalid page number');
    }
    if (isNaN(limitNumber) || limitNumber < 1) {
      throw new BadRequestException('Invalid limit number');
    }

    const data = this.productsService.getAll(pageNumber, limitNumber);
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    const product = this.productsService.getById(+id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return {
      statusCode: HttpStatus.OK,
      data: product,
    };
  }
  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() product) {
    this.validateProduct(product);
    const id = this.productsService.create(product);
    return {
      statusCode: HttpStatus.CREATED,
      data: { id },
    };
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() product) {
    this.validateProduct(product, true);
    const updatedId = this.productsService.update(+id, product);
    return {
      statusCode: HttpStatus.OK,
      data: { id: updatedId },
    };
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: string) {
    const deletedId = this.productsService.delete(+id);
    return {
      statusCode: HttpStatus.OK,
      data: { id: deletedId },
    };
  }

  private validateProduct(product, partial = false) {
    const requiredFields = ['name', 'description', 'price', 'stock', 'imgUrl'];

    if (!partial) {
      // For POST requests, all required fields must be present
      for (const field of requiredFields) {
        if (!product.hasOwnProperty(field)) {
          throw new BadRequestException(`Missing required field: ${field}`);
        }
      }
    }

    // For PUT requests, at least one field should be present
    if (partial && !Object.keys(product).some(key => requiredFields.includes(key))) {
      throw new BadRequestException('No valid fields provided for update');
    }

    // Validate the types of each field
    if (product.name && typeof product.name !== 'string') {
      throw new BadRequestException('Invalid type for name');
    }
    if (product.description && typeof product.description !== 'string') {
      throw new BadRequestException('Invalid type for description');
    }
    if (product.price && typeof product.price !== 'number') {
      throw new BadRequestException('Invalid type for price');
    }
    if (product.stock && typeof product.stock !== 'boolean') {
      throw new BadRequestException('Invalid type for stock');
    }
    if (product.imgUrl && typeof product.imgUrl !== 'string') {
      throw new BadRequestException('Invalid type for imgUrl');
    }
  }
}