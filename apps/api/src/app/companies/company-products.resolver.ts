import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductsByCompanyLoader } from './data-loader/products-by-company.loader/products-by-company.loader';
import { Company } from './entities/company';
import { Product } from './entities/product';

@Resolver(() => Company)
export class CompanyProductsResolver {
  constructor(private readonly productsByCompanyLoader: ProductsByCompanyLoader) {}
  @ResolveField('products', () => [Product])
  async getProductsOfCompany(@Parent() company: Company) {
    return this.productsByCompanyLoader.load(company.id);
  }
}
