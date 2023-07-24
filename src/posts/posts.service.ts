import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Post } from './entities/post.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private PostModel: Model<Post>,
    private cloudinaryService: CloudinaryService
  ) { }

  async create(createPostDto: CreatePostDto, image: Express.Multer.File,): Promise<Post> {
    const { title, body, author } = createPostDto
    let uploadResponse: UploadApiErrorResponse | UploadApiResponse
    if (image) {
      uploadResponse = await this.cloudinaryService.uploadToCloudinary(image)
    }
    const createdPost = new this.PostModel({
      title,
      body,
      author,
      tags: createPostDto.tags.split(','),
      image: {
        url: uploadResponse? uploadResponse.url : '',
        filename: uploadResponse? uploadResponse.public_id : ''
      }
    });
    const savedPost = await createdPost.save();
    return savedPost;
  }

  async findAll(paginationDto: PaginationDto): Promise<Post[]> {
    const { offset, limit } = paginationDto;
    const allPosts = await this.PostModel.find()
      .skip(offset)
      .limit(limit)
      .lean();
    if (!allPosts.length) {
      throw new NotFoundException('Posts not found');
    }
    return allPosts;
  }

  async findOne(id: string): Promise<Post> {
    const foundPost = await this.PostModel.findById(id);
    if (!foundPost) {
      throw new NotFoundException('Post not found');
    }
    return foundPost;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const updatedPost = await this.PostModel.findByIdAndUpdate(
      id,
      updatePostDto,
      { new: true },
    );
    if (!updatedPost) {
      throw new NotFoundException('Post not found');
    }
    return updatedPost;
  }

  async remove(id: string): Promise<Post> {
    const deletedPost = await this.PostModel.findByIdAndRemove(id);
    const imagePublicId: string = deletedPost.image.filename
    this.cloudinaryService.deleteFromCloudinary(imagePublicId)

    if (!deletedPost) {
      throw new NotFoundException('Post not found');
    }
    return deletedPost;
  }

  async removeComment(postId: string, commentId: string): Promise<Post> {
    const updatedPost = await this.PostModel.findByIdAndUpdate(
      { _id: postId },
      { $pull: { comments: commentId } },
      { new: true },
    );
    return updatedPost;
  }
}
