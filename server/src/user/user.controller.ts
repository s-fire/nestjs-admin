import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Post()
  create(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.create(CreateUserDto)
  }
  @Get()
  findAll(){
    console.log('aaa');
    
    return this.userService.findAll()
  }
  @Get(':id')
  findOne(@Param('id') id:string){
    console.log('id: ', id);
    return this.userService.findOne(id)
  }
  @Delete(':id')
  remove(@Param('id') id:string){
    return this.userService.remove(id)
  }
  @Patch(":id")
  updated(@Param('id') id:string,@Body() UpdateUserDto:UpdateUserDto){
    return this.userService.update(id,UpdateUserDto)
  }
}
