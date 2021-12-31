import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignIpRequestDTO } from 'src/dto/signin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class authController {
  constructor(private authService: AuthService) {}
  @Post('/signIn')
  async signIn(@Body() signingRequestDto: SignIpRequestDTO) {
    return this.authService.signIn(signingRequestDto);
  }

  @Get('private')
  async getdata() {
    return 'private';
  }
}
