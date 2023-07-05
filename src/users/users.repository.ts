import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./entities/user.entity";
import { FilterQuery, Model } from "mongoose";

@Injectable()
export class UsersRepository{
    
    constructor(@InjectModel(User.name) private userModel: Model<User>){}
    
}