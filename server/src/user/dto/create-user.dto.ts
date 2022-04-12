import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({message:'用户姓名不能为空!'})
  readonly username:string;
  @IsString()
  @IsNotEmpty({message:'用户密码不能为空!'})
  readonly password:string
}
