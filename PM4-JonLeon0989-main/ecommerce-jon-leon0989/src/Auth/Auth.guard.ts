import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const [authType, credentials] = authorizationHeader.split(' ');

    if (authType !== 'Basic' || !credentials) {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    const [email, password] = credentials.split(':');

    if (!email || !password) {
      throw new UnauthorizedException('Email or password missing in authorization header');
    }

    return true;
  }
}