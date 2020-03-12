import 'dotenv/config';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: [
            'http://localhost:4200', // angular
        ],
    });
    const options = new DocumentBuilder()
        .setTitle('NestJs api')
        .setDescription('This is a NestJs api demo')
        .setVersion('1.0')
        .addTag('user')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
    await app.listen(3000);
    Logger.log(`Server running on http://localhost:3000`, 'Bootstrap');
}

bootstrap();
