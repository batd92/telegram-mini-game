import { Module } from '@nestjs/common';
import { databaseProviders } from './database-connection.providers';
import { databaseModelsProviders } from './database-models.providers';
import mongodbConfig from 'config/mongodb.config';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mini-game';

@Module({
    imports: [
        ConfigModule.forFeature(mongodbConfig),
        MongooseModule.forRoot(MONGODB_URI),
    ],
    providers: [...databaseProviders, ...databaseModelsProviders],
    exports: [...databaseProviders, ...databaseModelsProviders],
})
export class DatabaseModule { }
