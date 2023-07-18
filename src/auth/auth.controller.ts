import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    return this.authService.login(username, password);
  }

  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto){
    return this.usersService.create(createUserDto);
  }
}
