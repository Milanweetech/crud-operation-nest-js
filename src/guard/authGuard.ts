import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: Request = context.switchToHttp().getRequest();
      const token = request.headers['authorization'];
      // console.log(token);
      if (!token) {
        throw new ForbiddenException();
      }

      const payload = this.jwtService.verify(token);

      console.log(payload);
      if (!payload) {
        throw new ForbiddenException();
      }
      request['user'] = payload;
      return true;
    } catch (e) {
      return false;
    }
  }
}
