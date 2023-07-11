import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { hashPassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {

  constructor( @InjectModel(User.name) private userModel: Model<User> ){}

  async create(createUserDto: CreateUserDto) {
    const {username,email} = createUserDto
    const userFound = await this.userModel.findOne()
        .or([{username}, {email}])

    if (userFound){
      throw new ConflictException('username or email already exist')
    }

    const hash = await hashPassword(createUserDto.password)
    const newUser = new this.userModel({...createUserDto, password: hash})
    const savedUser = await newUser.save()

    return savedUser
  }

  async findOne(id: string): Promise<User> {
    const foundUser = await this.userModel.findById(id)
    if (!foundUser){
        throw new NotFoundException(`user with id ${id} not found`)
    }
    return foundUser
  }
  async findUsername(username: string): Promise<User> {
    const foundUser = await this.userModel.findOne({username})
    if (!foundUser){
        throw new NotFoundException(`user ${username} not found`)
    }
    return foundUser
  }
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true})
    if(!updatedUser){
      throw new NotFoundException(`user with id ${id} not found`)
    }    
    return updatedUser
  }

  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id)
    if (!deletedUser){
        throw new NotFoundException(`user with id ${id} not found`)
    }
    return deletedUser
  }
}