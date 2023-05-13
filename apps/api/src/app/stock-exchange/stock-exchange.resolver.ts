import {Query, Resolver} from "@nestjs/graphql";
import {Organization} from "../common/interfaces/organization.interface";
import {StockExchange} from "./entities/stock-exchange.interface";
import {Company} from "../companies/entities/company";

@Resolver()
export class StockExchangeResolver {
  @Query(() => [Organization], { name: 'stocks'})
  async findAll(): Promise<StockExchange[]> {
    const organization = new Company();
    organization.id = 1;
    organization.name = 'Google';
    organization.brand = 'Software Engineering';

    const stockExchange = new StockExchange();
    stockExchange.name = 'Google';

    return [stockExchange, organization];
  }
}
