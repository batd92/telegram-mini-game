import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { config } from 'dotenv';
config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();

    app.use(
        session({
            secret: process.env.JWT_SECRET_KEY,
            resave: false,
            saveUninitialized: false,
        }),
    );
    // swagger
    const options = new DocumentBuilder()
        .setTitle('mini-game')
        .setDescription('This is mini game API')
        .setVersion('1.0')
        .addTag('mini')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT || 3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
