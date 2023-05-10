import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql";
import { join } from 'path';
import * as process from "process";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companiesModule';

/**
 * Represents the main application module.
 * @class
 */
@Module({
  imports: [
    /**
     * Configures the GraphQL module.
     * @type {GraphQLModule}
     */
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/api/src/schema.gql'),
    }),
    /**
     * Imports the Companies module.
     * @type {CompaniesModule}
     */
    CompaniesModule
  ],
  controllers: [
    /**
     * Registers the App controller.
     * @type {AppController}
     */
    AppController
  ],
  providers: [
    /**
     * Registers the App service.
     * @type {AppService}
     */
    AppService
  ],
})
export class AppModule {}
