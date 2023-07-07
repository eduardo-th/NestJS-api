import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(private readonly usersRepository: UsersRepository){}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.createUser(createUserDto)
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findById(id)
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}