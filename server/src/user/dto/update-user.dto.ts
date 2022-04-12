import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto){
  
}
// 返回传入的类的类型 同时所有属性是可选的 并且集成了所有的验证规则 也可通过@IsOptional()添加单个规则给每个字段