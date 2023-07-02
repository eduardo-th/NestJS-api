import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Post } from "./entities/post.entity";
import { FilterQuery, Model } from "mongoose";
import { UpdatePostDto } from "./dto/update-post.dto";


@Injectable()
export class PostRepository {
    constructor(@InjectModel(Post.name) private PostModel: Model<Post>){}

    async createPost(PostFilterQuery: FilterQuery<Post>){
        const createdPost = new this.PostModel(PostFilterQuery)        
        const savedPost = await createdPost.save()
        return savedPost
    }    
    async findPostById(id: string): Promise<Post>{
        const foundPost= await this.PostModel.findById(id)        
        if (!foundPost){
             throw new NotFoundException('Post not found')
        }
        return foundPost
    }
    async findAll(offset: number, limit: number): Promise<Post[]> {
        const allPosts = await this.PostModel.find().skip(offset).limit(limit).lean()
        if(!allPosts.length){
            throw new NotFoundException('Posts not found')
        }
        return allPosts
    }
    async deleteById(id: string): Promise<Post>{
        const deletedPost = await this.PostModel.findByIdAndRemove(id)
        if(!deletedPost){
            throw new NotFoundException('Post not found')
        }
        return deletedPost
    }
    async updatePost(id: string, updatePostDto: UpdatePostDto): Promise<Post>{
        const updatedPost = await this.PostModel.findByIdAndUpdate(id,updatePostDto,{new: true})        
        if(!updatedPost){
            throw new NotFoundException('Post not found')
        }
        return updatedPost
    }
}