import { User } from './entities/user.entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    // 注入用户实体
    @InjectRepository(User)
    private readonly userRepository:Repository<User>
  ){}
  // 新增用户方法
  async create(createUserDto:CreateUserDto){
    return this.userRepository.save(createUserDto)
  }
  //查询用户方法
  findAll(){
    return this.userRepository.find()
  }
  async findOne(id:string){
    const user = await this.userRepository.findOne(id)
    if (!user) {
      throw new NotFoundException(`user ${id} not found`)
    }
    return user
  }
  //修改用户方法
 async update(id:string,UpdateUserDto:UpdateUserDto){
    const user = await this.findOne(id)
    const updateUser = this.userRepository.merge(user,UpdateUserDto)
    return this.userRepository.save(updateUser)
  }
  // 删除
  async remove(id:string){
    const user = await this.findOne(id)
    return this.userRepository.remove(user)
  }
}
