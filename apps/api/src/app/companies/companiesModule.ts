import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CompaniesService} from './companies.service';
import {CompaniesResolver} from './companiesResolver';
import {Company} from './entities/company';
import {Product} from './entities/product';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Product])],
  providers: [CompaniesResolver, CompaniesService],
})
export class CompaniesModule {}
