import { Role } from 'src/user/role.enum';

export class SignUpRequestDTO {
  username: string;

  email: string;

  role: Role;

  password: string;

  phoneNo: number;
}
