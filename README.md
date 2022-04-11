# nestjs-admin
## 新建服务 
nest new 

## 创建数据库文件
nest g lib db
## 在app.module.ts里导入数据库文件

## 连接数据库，安装typeOrm
  npm i @nestjs/typeorm typeorm@0.2 mysql2 -S

  由于typeorm0.2和0.3差别比较大  这里用0.2版本
  
  在项目根目录下创建文件.env
```javascript
  // 数据库地址
  DB_HOST=localhost  
  // 数据库端口
  DB_PORT=3306
  // 数据库登录名
  DB_USER=root
  // 数据库登录密码
  DB_PASSWD=12345678
  // 数据库名字
  DB_DATABASE=admin
```
  然后在libs/db/src/db.modules.ts中连接数据库：
```JavaScript
  @Module({
    imports:[
      TypeOrmModule.forRoot({
        type:'mysql',
        host:'localhost',
        port:3306,
        username:'root',
        password:'12345678',
        database:'admin',
        autoLoadEntities:true, // 自动加载模块，而不是指定实体数组
        synchronize:true // TypeORM实体每次运行应用程序时自动同步数据库，生产环境需要关闭。
      })
    ],
    providers: [DbService],
    exports: [DbService],
  })
```
## 新建用户user实体
新建libs/db/src/entites/user.entities.ts
```JavaScript
  import { Column, Entity } from "typeorm";

  @Entity() //表示TS类和数据库表之间的关系
  //db.module.ts里初始化连接数据库的时候配置了自动同步 所以 @Entity 会自动把配置的Entity实体类在数据库中生成一个SQL表，数据库表明是类名的小写，如果要指定表明可以在装饰器里传参
  export class User{
    // 必须要配置主键 否则会报错
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    userName:string;

    @Column()
    password:string
  }
```
## 创建用户User module、control、service
nest g module user、nest g co user、nest g s user
## 在user.module.ts里导入User实体类
```javascript
  @Module({
    // 模块内引入使用forFeature
    imports:[TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService]
  })
```
## 编写controller里的方法
### DTO
  DTO简单理解是一个对象，用于封装数据并将其从一个应用程序发送到另一个应用程序，用来定义系统内的接口或者输入和输出(需要配合class-validator定义参数的字段类型)
#### 生成DTO
  nest g class user/dto/create-user.dto --no-spec
### 配置参数校验
安装 class-validator 校验参数字段格式

1. 配置user/dto/create-user.dto
```javascript
  import { IsString } from "class-validator";

  export class CreateUserDto {
    @IsString()
    readonly username:string;
    @IsString()
    readonly password:string
  }
```
2. 在main.ts里开启验证
```javascript
  import { ValidationPipe } from '@nestjs/common';
  import { NestFactory } from '@nestjs/core';
  import { AppModule } from './app.module';

  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true,
      transformOptions:{
        enableImplicitConversion:true // 将请求路劲上的字符串类型数字转换为number类型
      }
    }))
    await app.listen(3000);
  }
  bootstrap();
```

