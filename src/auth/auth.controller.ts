import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('login')
    loginUser(@Body() loginUserDto: LoginUserDto){
        const {username, password} = loginUserDto
        return this.authService.login(username, password)
    }

}