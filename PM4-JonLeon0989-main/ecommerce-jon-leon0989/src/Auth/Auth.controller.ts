import { Controller, Post, Body, HttpCode, HttpStatus, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './Auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() body) {
    const { email, password } = body;

    if (!email || !password) {
      throw new BadRequestException('Email y password son requeridos');
    }

    try {
      const result = this.authService.signIn(email, password);
      return {
        statusCode: HttpStatus.OK,
        data: result,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Email o password incorrectos');
      }
      throw error;
    }
  }
}