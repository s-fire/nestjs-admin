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
