import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guard/authGuard';
import { RoleGuard } from 'src/guard/roleGuard';
import { Role } from 'src/user/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(AuthGuard, RoleGuard),
  );
};
