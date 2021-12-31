import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignIpRequestDTO } from 'src/dto/signin.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  //signIn
  async signIn(signingRequestDto: SignIpRequestDTO) {
    const user = await this.userService.findByEmail(signingRequestDto.email);

    if (!user) {
      return {
        value: false,
        data: 'user not found',
      };
    }
    const validPassword = await bcrypt.compare(
      signingRequestDto.password,
      user.password!,
    );
    if (!validPassword) {
      return {
        value: false,
        data: 'wrong credentials',
      };
    }
    const payload = {
      username: user.username,
      email: user.email,
      role: user.role,
    };
    return {
      id: user._id,
      email: user.email,
      role: user.role,
      access_token: this.jwtService.sign(payload),
    };
  }
}
