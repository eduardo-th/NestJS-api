import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './posts.repository';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PostsService {

  constructor(private readonly postRepository: PostRepository  ){}
    
  create(createPostDto: CreatePostDto) {
    return this.postRepository.createPost(createPostDto);
  }

  findAll(paginationDto: PaginationDto) {
    const { offset, limit } = paginationDto;
    return this.postRepository.findAll(offset, limit);    
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
