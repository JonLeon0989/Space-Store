import { Controller, Get, Param, Post, Put, Delete, Body, HttpCode, HttpStatus, NotFoundException, BadRequestException, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './Users.service';
import { AuthGuard } from '../Auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(AuthGuard)
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

    const data = this.usersService.getAll(pageNumber, limitNumber);
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  getById(@Param('id') id: string) {
    const user = this.usersService.getById(Number(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      statusCode: HttpStatus.OK,
      data: user,
    };
  }
  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() user) {
    this.validateUser(user);
    const id = this.usersService.create(user);
    return {
      statusCode: HttpStatus.CREATED,
      data: { id },
    };
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() user) {
    this.validateUser(user, true);
    const updatedId = this.usersService.update(+id, user);
    return {
      statusCode: HttpStatus.OK,
      data: { id: updatedId },
    };
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: string) {
    const deletedId = this.usersService.delete(+id);
    return {
      statusCode: HttpStatus.OK,
      data: { id: deletedId },
    };
  }

  private validateUser(user, partial = false) {
    const requiredFields = ['email', 'name', 'password', 'address', 'phone'];
    const optionalFields = ['country', 'city'];

    if (!partial) {
      // For POST requests, all required fields must be present
      for (const field of requiredFields) {
        if (!user.hasOwnProperty(field)) {
          throw new BadRequestException(`Missing required field: ${field}`);
        }
      }
    }

    // For PUT requests, at least one field should be present
    if (partial && !Object.keys(user).some(key => requiredFields.includes(key) || optionalFields.includes(key))) {
      throw new BadRequestException('No valid fields provided for update');
    }

    // Validate the types of each field
    if (user.email && typeof user.email !== 'string') {
      throw new BadRequestException('Invalid type for email');
    }
    if (user.name && typeof user.name !== 'string') {
      throw new BadRequestException('Invalid type for name');
    }
    if (user.password && typeof user.password !== 'string') {
      throw new BadRequestException('Invalid type for password');
    }
    if (user.address && typeof user.address !== 'string') {
      throw new BadRequestException('Invalid type for address');
    }
    if (user.phone && typeof user.phone !== 'string') {
      throw new BadRequestException('Invalid type for phone');
    }
    if (user.country && typeof user.country !== 'string') {
      throw new BadRequestException('Invalid type for country');
    }
    if (user.city && typeof user.city !== 'string') {
      throw new BadRequestException('Invalid type for city');
    }
  }
}