import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './posts.repository';

@Injectable()
export class PostsService {

  constructor(private readonly postRepository: PostRepository  ){}
    
  create(createPostDto: CreatePostDto) {
    return this.postRepository.createPost(createPostDto);
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: string) {
    return this.postRepository.findPostById(id);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
