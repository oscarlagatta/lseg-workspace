import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company';
import { Product } from './entities/product';

@Resolver(() => Company)
export class CompanyProductsResolver {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}
  @ResolveField('products', () => [Product])
  async getProductsOfCompany(@Parent() company: Company) {
    return this.productsRepository
      .createQueryBuilder('product')
      .innerJoin('product.companies', 'companies', 'companies.id = :companyId', {
        companyId: company.id,
      })
      .getMany();
  }
}
