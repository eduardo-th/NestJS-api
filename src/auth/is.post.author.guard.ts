import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { PostsService } from 'src/posts/posts.service';


@Injectable()
export class IsPostAuthorGuard implements CanActivate {
  constructor(private postsService: PostsService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const foundPost = await this.postsService.findOne(request.params.id)
    if (foundPost.author.toString() !== request.user.id) {
      throw new UnauthorizedException('Not authorized');
    }
    return true;
  }
}
