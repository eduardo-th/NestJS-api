import { ConflictException, Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./entities/user.entity";
import { FilterQuery, Model } from "mongoose";
import { hashPassword } from "src/utils/bcrypt";

@Injectable()
export class UsersRepository{
    
    constructor(@InjectModel(User.name) private userModel: Model<User>){}
    
    async createUser(userFilterQuery: FilterQuery<User>): Promise<User>{
        const {username,email} = userFilterQuery
        const userFound = await this.userExist(username, email)

        if (userFound){
            throw new ConflictException('username or email already exist')
        }

        const hash = await hashPassword(userFilterQuery.password)
        const newUser = new this.userModel({...userFilterQuery, password: hash})
        const savedUser = await newUser.save()
        return savedUser
    }

    async userExist(username: string, email: string): Promise<boolean>{
        const userFound = await this.userModel.findOne()
        .or([{username}, {email}])
        return userFound !== null
    }
}