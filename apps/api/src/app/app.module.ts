import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {Module} from '@nestjs/common';
import {GraphQLModule} from "@nestjs/graphql";
import {join} from 'path';
import * as process from "process";
import {AppController} from './app.controller';
import {AppService} from './app.service';
import { CompaniesModule } from './companies/companiesModule';


@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'apps/api/src/schema.gql'),
  }), CompaniesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
