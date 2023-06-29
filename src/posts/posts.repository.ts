import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Post } from "./entities/post.entity";
import { FilterQuery, Model } from "mongoose";


@Injectable()
export class PostRepository {
    constructor(@InjectModel(Post.name) private PostModel: Model<Post>){}

    async createPost(PostFilterQuery: FilterQuery<Post>){
        const createdPost = new this.PostModel(PostFilterQuery)        
        const savedPost = await createdPost.save()
        return savedPost
    }    
}