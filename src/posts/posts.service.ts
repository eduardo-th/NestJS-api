import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Post } from './entities/post.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostsService {

  constructor(@InjectModel(Post.name) private PostModel: Model<Post>){}
    
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.PostModel(createPostDto)
    const savedPost = await createdPost.save()
    return savedPost
  }

  async findAll(paginationDto: PaginationDto): Promise<Post[]> {
    const { offset, limit } = paginationDto;
    const allPosts = await this.PostModel.find().skip(offset).limit(limit).lean()
    if(!allPosts.length){
        throw new NotFoundException('Posts not found')
    }
    return allPosts
  }

  async findOne(id: string): Promise<Post> {
    const foundPost= await this.PostModel.findById(id)
    if (!foundPost){
      throw new NotFoundException('Post not found')
    }
    return foundPost
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const updatedPost = await this.PostModel.findByIdAndUpdate(id,updatePostDto,{new: true})
    if(!updatedPost){
        throw new NotFoundException('Post not found')
    }
    return updatedPost
  }

  async remove(id: string): Promise<Post> {
    const deletedPost = await this.PostModel.findByIdAndRemove(id)
    if(!deletedPost){
        throw new NotFoundException('Post not found')
    }
    return deletedPost
  }
}
