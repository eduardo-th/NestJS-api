import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { LoginRequest } from 'src/auth/entity/login-request';
import { Comment } from './entities/comment.entity';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: LoginRequest,
    @Param('postId') postId: string,
  ) {
    const userId = req.user.id;

    return this.commentsService.create(createCommentDto, userId, postId);
  } 

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(
    @Req() req: LoginRequest,
    @Param('postId') postId: string,
    @Param('id') id: string,
  ): Promise<Comment>
   {
    return this.commentsService.remove(req.user.id, postId, id);
  }
}
