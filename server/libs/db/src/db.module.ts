import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbService } from './db.service';

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
export class DbModule {}
