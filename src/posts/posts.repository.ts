import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Post } from "./entities/post.entity";
import { Model } from "mongoose";


@Injectable()
export class PostRepository {
    constructor(@InjectModel(Post.name) private PostModel: Model<Post>){}    
    
}