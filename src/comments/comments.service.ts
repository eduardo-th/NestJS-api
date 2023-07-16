import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';
import { Post } from 'src/posts/entities/post.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    private postService: PostsService,
    private userService: UsersService,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    userId: string,
    postId: string,
  ) {
    const data = {
      comment: createCommentDto.comment,
      author: userId,
      post: postId,
    };

    const newComment = new this.commentModel(data);
    const saveComment = await newComment.save();

    const foundPost: Post = await this.postService.findOne(postId);
    foundPost.comments.push(newComment.id);
    foundPost.save();

    const foundUser = await this.userService.findOne(userId);
    foundUser.comments.push(newComment.id);
    foundUser.save();

    return saveComment;
  }  

  async findOne(id: string): Promise <Comment> {
    const foundComment = await this.commentModel.findById(id)
    return foundComment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const updatedComment = await this.commentModel.findByIdAndUpdate(id, updateCommentDto, { new: true })

    return updatedComment;
  }

  async remove(userId: string, postId: string, id: string): Promise<Comment> {
    await this.postService.removeComment(postId, id);
    await this.userService.removeComment(userId, id);

    const removeComment = await this.commentModel.findByIdAndRemove(id);
    console.log(removeComment);

    return removeComment;
  }
}
