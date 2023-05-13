import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SwaggerModule } from '@nestjs/swagger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import * as process from 'process';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockExchange } from './stock-exchange/entities/stock-exchange.interface';
import { DateScalar } from './common/scalars/date.scalar';
import { CompaniesModule } from './companies/companiesModule';

/**
 * Represents the main application module.
 * @class
 */
@Module({
  imports: [
    SwaggerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    /**
     * Configures the GraphQL module.
     * @type {GraphQLModule}
     */
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/api/src/schema.gql'),
      buildSchemaOptions: {
        orphanedTypes: [StockExchange],
      },
      installSubscriptionHandlers: true,
    }),
    /**
     * Imports the Companies module.
     * @type {CompaniesModule}
     */
    CompaniesModule,
  ],
  controllers: [
    /**
     * Registers the App controller.
     * @type {AppController}
     */
    AppController,
  ],
  providers: [
    /**
     * Registers the App service.
     * @type {AppService}
     */
    AppService,
    DateScalar,
  ],
})
export class AppModule {}
