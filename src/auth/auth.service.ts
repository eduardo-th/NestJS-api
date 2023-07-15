import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
        ){}

    async login(username: string, password: string){
        
        const foundUser = await this.userService.findUsername(username)

        const isSamePassword = await comparePassword(password, foundUser.password)
        if (!isSamePassword){
            throw new UnauthorizedException('invalid user or password')
        }

        const userInfo = {
            username,
            id: foundUser.id,
            email: foundUser.email,
        }
        const jwtToken = this.jwtService.sign(userInfo)

        return {jwtToken}
    }
}