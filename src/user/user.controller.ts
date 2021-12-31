import {
  Controller,
  Post,
  Get,
  Res,
  Body,
  Put,
  Param,
  HttpStatus,
  Delete,
  UseInterceptors,
  UseFilters,
  HttpException,
  ForbiddenException,
} from '@nestjs/common';
import { Roles } from 'src/decorator/roles.decorator';
import { SignUpRequestDTO } from 'src/dto/signup.dto';
import { HttpExceptionFilter } from 'src/exception filters/http-exception.filter';
import { LoggingInterceptor } from 'src/Interceptors/logging.interceptor';
import { Role } from './role.enum';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles(Role.Admin)
  @Post('create')
  @UseInterceptors(LoggingInterceptor)
  @UseFilters(new HttpExceptionFilter())
  async createUser(
    @Res() response,
    @Body() signupRequestDto: SignUpRequestDTO,
  ) {
    const newUser = await this.userService.createUser(signupRequestDto);
    if (newUser)
      return response.status(HttpStatus.CREATED).json({
        signupRequestDto,
      });
    else {
      throw new ForbiddenException();
    }
  }

  @Put('update/:id')
  async updateUser(
    @Res() response,
    @Param('id') id,
    @Body() signupRequestDto: SignUpRequestDTO,
  ) {
    const updateUser = await this.userService.updateUser(id, signupRequestDto);
    return response.status(HttpStatus.OK).json({ updateUser });
  }

  @Roles(Role.Admin)
  @Get('getUser/:email')
  @UseInterceptors(LoggingInterceptor)
  async findByEmail(@Res() response, @Param('email') email) {
    const user = await this.userService.findByEmail(email);
    return response.status(HttpStatus.OK).json({ user });
  }

  @Get('/')
  async test() {
    return this.userService.getUser();
  }

  @Roles(Role.Admin)
  @Delete('/delete/:id')
  async deleteUser(@Res() response, @Param('id') id) {
    const deleteUser = await this.userService.deleteUser(id);
    return response.status(HttpStatus.OK).json({ deleteUser });
  }
}
