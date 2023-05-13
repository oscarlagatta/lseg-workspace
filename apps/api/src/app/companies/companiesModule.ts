import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {PubSubModule} from "../pub-sub/pub-sub.module";
import {StockExchangeResolver} from "../stock-exchange/stock-exchange.resolver";
import { CompaniesService } from './companies.service';
import { CompaniesResolver } from './companies.resolver';
import { CompanyProductsResolver } from './company-products.resolver';
import { Company } from './entities/company';
import { Product } from './entities/product';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Product]), PubSubModule],
  providers: [CompaniesResolver, CompanyProductsResolver, StockExchangeResolver, CompaniesService],
})
export class CompaniesModule {}
