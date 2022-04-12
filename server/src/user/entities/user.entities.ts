import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() //表示TS类和数据库表之间的关系
//db.module.ts里初始化连接数据库的时候配置了自动同步 所以 @Entity 会自动把配置的Entity实体类在数据库中生成一个SQL表，数据库表明是类名的小写，如果要指定表明可以在装饰器里传参
export class User{
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  username:string;

  @Column()
  password:string;

  @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
  create_time:Date
}