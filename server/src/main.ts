import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 设置参数白名单，未在DTO中声明的字段将被过滤
    forbidNonWhitelisted: true, //若参数中有未在DTO中存在的字段，终止请求
    transformOptions: {
      enableImplicitConversion: true // 将请求路劲上的字符串类型数字转换为number类型
    }
  }))
  console.log('serve start');
  
  await app.listen(3001);
}
bootstrap();
