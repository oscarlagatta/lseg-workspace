import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesService } from './companies.service';
import { CompaniesResolver } from './companies.resolver';
import { CompanyProductsResolver } from './company-products.resolver';
import { Company } from './entities/company';
import { Product } from './entities/product';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Product])],
  providers: [CompaniesResolver, CompanyProductsResolver, CompaniesService],
})
export class CompaniesModule {}
