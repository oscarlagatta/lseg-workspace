import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';
import { Company } from '../../entities/company';
import { Product } from '../../entities/product';
@Injectable({ scope: Scope.REQUEST })
export class ProductsByCompanyLoader extends DataLoader<number, Product[]> {
  constructor(
    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>,
  ) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(companyIds: readonly number[]): Promise<Product[][]> {
    const companiesWithProducts = await this.companiesRepository.find({
      select: ['id'], // since we don't really need a company object here
      relations: ['products'], // to fetch related products
      where: {
        id: In(companyIds as number[]), // to make sure we only query requested companies
      },
    });

    // to map an array of companies two a 2-dimensional array of products where position in the array indicates to which company products belong
    return companiesWithProducts.map((company) => company.products);
  }
}
