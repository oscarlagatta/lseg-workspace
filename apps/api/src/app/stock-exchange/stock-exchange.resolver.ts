import { Query, Resolver } from '@nestjs/graphql';
import { OrganizationsResultUnion } from '../common/unions/organizations-result.union';
import { StockExchange } from './entities/stock-exchange.interface';
import { Company } from '../companies/entities/company';

@Resolver()
export class StockExchangeResolver {
  @Query(() => [OrganizationsResultUnion], { name: 'stocks' })
  async findAll(): Promise<(typeof OrganizationsResultUnion)[]> {
    const organization = new Company();
    organization.id = 1;
    organization.name = 'Google';
    organization.brand = 'Software Engineering';

    const stockExchange = new StockExchange();
    stockExchange.name = 'Google';

    return [stockExchange, organization];
  }
}
