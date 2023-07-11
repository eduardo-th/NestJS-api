import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService){}

  async canActivate( context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = request.headers.authorization?.split(' ')[1] ?? null
    if(!token){
      throw new UnauthorizedException('Not authorized')
    }
    
    try {
       const data = await this.jwtService.verifyAsync(token)
       request.user = data
      
    } catch (error) {
      throw new UnauthorizedException('Not authorized')
    }
    return true;
  }
}