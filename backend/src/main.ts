import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import {
    RequestMethod,
    ValidationPipe,
    VersioningOptions,
    VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from 'interceptors/transform.interceptor';
import basicAuth from 'express-basic-auth';
import { AllExceptionsFilter } from 'filters/all-exception.filter';
import { AccessExceptionFilter } from 'filters/access-exception.filter';
import { NotFoundExceptionFilter } from 'filters/not-found-exception.filter';
import { BadRequestExceptionFilter } from 'filters/bad-request-exception.filter';
import { ValidationExceptionFilter } from 'filters/validation-exception.filter';
import { ThrottlerExceptionsFilter } from 'filters/throttler-exception.filter';

async function bootstrap() {
    // Create the Nest application
    const app = await NestFactory.create(AppModule);

    // Enable global validation pipes
    app.useGlobalPipes(new ValidationPipe());

    // Enable CORS for all routes
    app.enableCors();

    // Get configuration service
    const configService: ConfigService<any, boolean> = app.get(ConfigService);
    const swaggerConfig = configService.get('swagger');

    // Set global prefix for all routes except for GET /
    const optionsPrefix = {
        exclude: [{ path: '/', method: RequestMethod.GET }],
    };
    app.setGlobalPrefix('api', optionsPrefix);

    // Enable versioning for all routes
    const versioningOptions: VersioningOptions = {
        type: VersioningType.URI,
        defaultVersion: '1',
    };
    app.enableVersioning(versioningOptions);

    // Configure Swagger with basic authentication
    app.use(
        ['/docs'],
        basicAuth({
            challenge: true,
            users: {
                admin: swaggerConfig.password,
            },
        }),
    );

    // Setup Swagger documentation
    const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
        .setTitle('Api v1')
        .setDescription('Starter API v1')
        .setVersion('1.0')
        .addBearerAuth({ in: 'header', type: 'http' })
        .build();

    const document: OpenAPIObject = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true, // Persist authorization across requests
        },
    });

    // Use global interceptors
    app.useGlobalInterceptors(new TransformInterceptor());

    // Enable global exception filters
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(
        new AllExceptionsFilter(), // General exception filter
        new AccessExceptionFilter(httpAdapter), // Access exception filter
        new NotFoundExceptionFilter(), // Not found exception filter
        new BadRequestExceptionFilter(), // Bad request exception filter
        new ValidationExceptionFilter(), // Validation exception filter
        new ThrottlerExceptionsFilter(), // Throttler exception filter
    );

    await app.listen(process.env.PORT || 3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
