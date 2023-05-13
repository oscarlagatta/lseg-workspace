import { createUnionType } from '@nestjs/graphql';
import { Company } from '../../companies/entities/company';
import { StockExchange } from '../../stock-exchange/entities/stock-exchange.interface';

export const OrganizationsResultUnion = createUnionType({
  name: 'OrganizationsResult',
  types: () => [Company, StockExchange],
});
