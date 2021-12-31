import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from 'src/decorator/roles.decorator';
import { Role } from 'src/user/role.enum';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      //console.log('=>', requiredRoles);
      if (!requiredRoles) {
        return true;
      }
      const request: Request = context.switchToHttp().getRequest();
      //console.log('->', request['user'].role);
      return requiredRoles.some((role) => request['user'].role?.includes(role));
    } catch (e) {
      return false;
    }
  }
}
